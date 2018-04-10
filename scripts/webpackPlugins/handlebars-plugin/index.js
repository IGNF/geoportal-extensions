var handlebars = require('handlebars');
var glob = require("glob");
var fs = require("fs");
var path = require("path");
const chalk = require("chalk");
var mkdirp = require('mkdirp');



class HandlebarsPlugin {
    constructor(options) {
        this.options = Object.assign({
            entry: null,
            output: null,
            context: null,
            helpers: null,
            partials: null,
        }, options);

        this.assetsToEmit = {};
        // files being watched : compilation triggers when those files change
        this.fileDependencies = [];
        this.prevTimestamps = {};
        this.startTime = Date.now();

        this.loadContext();
        this.registerHelpers();
        this.loadPartials();
    }

    /**
     * Merges all context information to one single Object.
     */
    loadContext() {
        if ( this.options.context && this.options.context.constructor !== Array ) {
            this.options.context = [this.options.context];
        }
        var self = this;
        var contextObj = {};
        this.options.context.forEach( function (contextElement) {
            if (typeof contextElement === "object") {
                Object.assign(contextObj, contextElement);
            } else if ( typeof contextElement === "string" ) {
                var contextFiles = glob.sync(contextElement);
                contextFiles.forEach(function (contextFile) {
                    try {
                        Object.assign(contextObj, JSON.parse(self.readFile(contextFile)));
                    } catch (e) {
                        console.error("[HandlebarsPlugin] Tried to read "+contextFile+" as json-file and failed.");
                    }
                });
            }
        });
        this.options.context = contextObj;
    }

    /**
     * Register all helpers to Handlebars
     */
    registerHelpers() {
        if( !this.options.helpers ) {
            return;
        }
        this.options.helpers.forEach( function(helper) {
            handlebars.registerHelper(helper(handlebars));
        });
    }

    /**
     * Register all partials to Handlebars
     */
    loadPartials() {
        if( !this.options.partials ) {
            return;
        }
        var self = this;
        this.options.partials.forEach( function(files) {
            var files = glob.sync(files);
            files.forEach( function(file) {
                var partialName = path.parse(file).name;
                console.log(chalk.grey("[HandlebarsPlugin] Add partial '"+partialName+"'"));
                handlebars.registerPartial(partialName, self.readFile(file));
            });
        });
    }

    /**
     * Webpack plugin hook - main entry point
     * @param  {Compiler} compiler
     */
    apply(compiler) {
        var self = this;
        compiler.plugin("make", function(compilation,callback) {
            if (self.dependenciesUpdated(compilation) === false) {
                return callback();
            }
            self.compileAllEntryFiles(compilation.compiler.outputPath, callback); // build all html pages
        });

        compiler.plugin("emit", function(compilation, callback) {
            // register dependencies at webpack
            if (compilation.fileDependencies.add) {
                // webpack@4
                self.fileDependencies.forEach(compilation.fileDependencies.add, compilation.fileDependencies);
            } else {
                compilation.fileDependencies = compilation.fileDependencies.concat(self.fileDependencies);
            }
            self.emitGeneratedFiles(compilation);
            return callback();
        });
    }

    /**
     * @param  {Object} compilation     - webpack compilation
     * @return {Boolean} true, if a handlebars file or helper has been updated
     */
    dependenciesUpdated(compilation) {
        // NOTE: fileTimestamps will be an `object` or `Map` depending on the webpack version
        const fileTimestamps = compilation.fileTimestamps;
        const fileNames = fileTimestamps.has ? Array.from(fileTimestamps.keys()) : Object.keys(fileTimestamps);

        const changedFiles = fileNames.filter((watchfile) => {
            const prevTimestamp = this.prevTimestamps[watchfile];
            const nextTimestamp = fileTimestamps.has ? fileTimestamps.get(watchfile) : fileTimestamps[watchfile];
            this.prevTimestamps[watchfile] = nextTimestamp;
            return (prevTimestamp || this.startTime) < (nextTimestamp || Infinity);
        });

        // diff may be zero on initial build, thus also rebuild if there are no changes
        return changedFiles.length === 0 || this.containsOwnDependency(changedFiles);
    }

    /**
     * @param  {Array} list     - list of changed files as absolute paths
     * @return {Boolean} true, if a file is a dependency of this handlebars build
     */
    containsOwnDependency(list) {
        for (let i = 0; i < list.length; i += 1) {
            if (this.fileDependencies.includes(list[i])) {
                return true;
            }
        }
        return false;
    }

    /**
     * @async
     * Generates all given handlebars templates
     * @param  {String} compilerOutPutPath  - webpack output path for build results
     * @param  {Function} callback
     */
    compileAllEntryFiles(compilerOutPutPath, callback) {
        var self = this;
        var targetRoot = ( this.options.output && this.options.output.path )? this.options.output.path : compilerOutPutPath;

        if( this.options.entry.path && this.options.entry.pattern ) {
            glob(this.options.entry.pattern, {cwd: this.options.entry.path, nodir: true}, (err, entryFilesArray) => {
                if (err) {
                    console.error(chalk.yellow("[HandlebarsPlugin] No valid entry -- aborting"));
                    throw err;
                }

                if (entryFilesArray.length === 0) {
                    return console.error(chalk.yellow("[HandlebarsPlugin] No valid entry files found for '"+path.join(self.options.entry.path, this.options.entry.pattern)+"' -- aborting"));
                }
                entryFilesArray.forEach( function (fileRelativePath) {
                    var targetBaseName = self.options.output && self.options.output.filename || path.basename(fileRelativePath);
                    var targetRelativeDirs = ( !self.options.output || (self.options.output && self.options.output.flatten) )? "" : path.dirname(fileRelativePath);
                    var sourceFilePath = path.join(self.options.entry.path, fileRelativePath);
                    var targetFilePath = path.join(targetRoot, targetRelativeDirs, targetBaseName);
                    self.compileEntryFile(sourceFilePath , targetFilePath, compilerOutPutPath);
                });
                callback();
            })
        }
        else if( typeof this.options.entry === 'string' ) {
            var targetBaseName = this.options.output && this.options.output.filename || path.baseName(this.options.entry);
            fs.access( this.options.entry, (err) => {
                if (err) {
                    console.error(chalk.yellow("[HandlebarsPlugin] Can't access file '"+this.options.entry+"' -- aborting"));
                    throw err;
                }

                self.compileEntryFile(this.options.entry, path.join(targetRoot, targetBaseName), compilerOutPutPath);
                callback();
            })
        }else{
            console.error(chalk.yellow("[HandlebarsPlugin] No valid entry  -- aborting"));
        }
    }

    /**
     * Generates the html file for the given filepath
     * @param  {String} sourcePath  - filepath to handelebars template
     * @param  {String} outputPath  - handelebars output filepath
     * @param  {String} compilerOutPutPath  - webpack output path for build results
     */
    compileEntryFile(sourcePath, outputPath, compilerOutPutPath) {
        var template = handlebars.compile( this.readFile(sourcePath) );

        // Render template
        var result = template(this.options.context);
        let targetFilePath = this.getTargetFilePath(sourcePath, outputPath);

        if (targetFilePath.includes(compilerOutPutPath)) {
            // change the destination path relative to webpacks output folder and emit it via webpack
            targetFilePath = targetFilePath.replace(compilerOutPutPath, "").replace(/^\/*/, "");

            this.assetsToEmit[targetFilePath] = {
                source: () => result,
                size: () => result.length
            };

        } else {
            // @legacy: if the filepath lies outside the actual webpack destination folder, simply write that file.
            // There is no wds-support here, because of watched assets being emitted again
            this.writeFile(targetFilePath, result, function(err) {
                if(err) {
                    console.error(chalk.yellow("[HandlebarsPlugin] Can't write file '"+targetFilePath+"'"));
                    throw err;
                }
            });
        }

        console.log(chalk.grey(`[HandlebarsPlugin] created output '${targetFilePath.replace(`${process.cwd()}/`, "")}'`));
    }

    /**
     * Returns contents of a dependent file
     * @param  {String} filepath
     * @return {String} filecontents
     */
    readFile(filepath) {
        // Add file as dependency in order to make it watchable
        this.fileDependencies.push(filepath);
        return fs.readFileSync(filepath, "utf-8");
    }

    /**
     * Write a file and create parent directories if they doesn't exist
     * @param  {String} filepath
     * @param  {String} filecontents
     * @param {Function} cd - callback
     */
    writeFile(filePath, contents, cb) {
        mkdirp(path.dirname(filePath), function (err) {
            if (err) return cb(err);
            fs.writeFile(filePath, contents, cb);
        });
    }

    /**
     * Notifies webpack-dev-server of generated files
     * @param  {Compilation} compilation
     */
    emitGeneratedFiles(compilation) {
        Object.keys(this.assetsToEmit).forEach((filename) => {
            compilation.assets[filename] = this.assetsToEmit[filename];
        });
    }

    /**
     * Returns the target filepath of a handlebars template
     * @param  {String} filepath            - input filepath
     * @param  {String} [outputTemplate]    - template for output filename.
     *                                          If ommited, the same filename stripped of its extension will be used
     * @return {String} target filepath
     */
    getTargetFilePath(filepath, outputTemplate) {
        const fileName = path.parse(filepath).name;
        var targetFilePath = outputTemplate.replace("[name]", fileName);
        if( targetFilePath === filepath ) {
            return filepath.replace(path.extname(filepath), "");
        }
        return targetFilePath;
    }
}

module.exports = HandlebarsPlugin;
