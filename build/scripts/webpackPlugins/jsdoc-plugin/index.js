var fs = require('fs');
var path = require('path');
var merge = require('lodash/merge');
var spawn = require('child_process').spawn;
var fsExtra = require('fs-extra');

function Plugin(translationOptions) {
    var defaultOptions = {
        conf: './jsdoc.conf'
    };

    this.options = merge({}, defaultOptions, translationOptions);
}

Plugin.prototype.apply = function (compiler) {
    var self = this;
    var options = self.options;

    compiler.plugin('watch-run', function (watching, callback) {
        self.webpackIsWatching = true;
        callback(null, null);
    });

    compiler.plugin('emit', function (compilation, callback) {
        console.log('JSDOC Start generating');

        fsExtra.readJson(path.resolve(process.cwd(), options.conf), function (err, obj) {
            var files = [], jsdocErrors = [];
            var jsdoc, cwd = process.cwd();

            if(err) {
                callback(err);
                return;
            }

            if (obj.source && obj.source.include) {
                console.log('Taking sources from config file');
            } else {
                compilation.chunks.forEach(function (chunk) {
                    chunk.modules.forEach(function (module) {
                        if (module.fileDependencies) {
                            module.fileDependencies.forEach(function (filepath) {
                                files.push(path.relative(process.cwd(), filepath));
                            });
                        }
                    });
                });
                merge(obj.source, { include: files });
            }

            var jsDocConfTmp = path.resolve(cwd, 'jsdoc.' + Date.now() + '.conf.tmp');
            fs.writeFileSync(jsDocConfTmp, JSON.stringify(obj));

            if(/^win/.test(process.platform)) {
                jsdoc = spawn('./node_modules/.bin/jsdoc.cmd', ['-c', jsDocConfTmp]);
            } else {
                jsdoc = spawn('./node_modules/.bin/jsdoc', ['-c', jsDocConfTmp]);
            }


            jsdoc.stdout.on('data', function (data) {
                console.log(data.toString());
            });

            jsdoc.stderr.on('data', function (data) {
                jsdocErrors.push(data.toString());
            });

            jsdoc.on('close', function (data, code) {
                if(jsdocErrors.length > 0) {
                    jsdocErrors.forEach(function (value) {
                        console.error(value);
                    });
                } else {
                    console.log('JsDoc successful');
                }
                fs.unlink(jsDocConfTmp, function() {
                    callback();
                });
            });
        });
    });

    compiler.plugin('done', function (stats) {
        console.log('JSDOC Finished generating');
        console.log('JSDOC TOTAL TIME:', stats.endTime - stats.startTime);
    });
};

module.exports = Plugin;
