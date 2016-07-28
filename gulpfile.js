/* global process */

(function (gulp, gulpLoadPlugins) {
    "use strict";

    // plugins
    var $ = gulpLoadPlugins({
        pattern : "*",
        lazy : true
    });

    // gestion des paths
    var path  = require("path");

    // liste des répertoires sources (ex. dir.src)
    var _dir = {
        src :     "src",
        preSrc :  "preSrc",
        res :     "res",
        lib :     "lib",
        test :    "test",
        doc :     "doc",
        samples : "samples",
        dist :    "dist"
    };

    // répertoire de build racine par defaut
    var _build = path.join("target", "build");

    // liste des fichiers sources (ex. src.js.ol3)
    var _src = {
        js : {
            ol3 : path.join(_dir.src, "Ol3","**/*.js"),
            leaflet : path.join(_dir.src, "Leaflet", "**/*.js"),
            vg : path.join(_dir.src, "Vg", "**/*.js"),
            common : path.join(_dir.src, "Common", "**/*.js")
        },
        img : {
            ol3 : _dir.res + "/ol3/**/*",
            leaflet : _dir.res + "/leaflet/**/*.png",
            vg : _dir.res + "/vg/**/*.png",
            common : _dir.res + "/common/**/*.gif"
        },
        css : {
            ol3 : _dir.res + "/ol3/**/*.css",
            leaflet : _dir.res + "/leaflet/**/*.css",
            vg : _dir.res + "/vg/**/*.css",
            common : _dir.res + "/common/*.css"
        }
    };

    //|**~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    //| ✓ Options
    //| > usage : gulp [task] [--production] [--ol3] [--leaflet] [--vg]
    //'~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
    var opts = require("minimist")(process.argv.slice(2));
    var isProduction     = opts.production;
    var isExecuteOl3     = opts.ol3;
    var isExecuteLeaflet = opts.leaflet;
    var isExecuteVg      = opts.vg;

    // conf variables
    var npmConf = require("./package.json");
    var buildDate = new Date().toISOString().split("T")[0];

    var modeExt = isProduction ? "" : "-src" ;
    var leafletOutputNameBase = "GpPluginLeaflet" ;
    var ol3OutputNameBase = "GpPluginOl3" ;
    var vgOutputNameBase = "GpPluginVg" ;
    var ol3BuildDir = path.join(_build, "Ol3");
    var leafletBuildDir = path.join(_build, "Leaflet");
    var vgBuildDir = path.join(_build, "Vg");

    // par contre, si aucune option est renseignée,
    // on construit les bundles pour OpenLayers3 et Leaflet
    if (!isExecuteOl3 && !isExecuteLeaflet && !isExecuteVg) {
        isExecuteOl3 = isExecuteLeaflet = true;
    }

    //|**~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    //| ✓ help
    //'~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
    gulp.task("help", function () {
        $.util.log("Liste des target principales :");
        $.util.log(" - build : construction complète du projet (target par defaut).");
        $.util.log(" -- umd  : construction du bundle.");
        $.util.log(" -- check : controle des sources.");
        $.util.log(" -- test : execution des tests unitaires.");
        $.util.log(" -- res : construction des ressources (images et styles).");
        $.util.log(" -- licence : ajout des licences sur le bundle.");
        $.util.log(" -- doc  : construction de la JSDOC.");
        $.util.log(" -- publish : publication de la librairie.");
        $.util.log("Liste des options :");
        $.util.log(" --production : minification et aggregation des sources.");
        $.util.log(" --ol3 : construction du bundle de OpenLayers3.");
        $.util.log(" --leaflet : construction du bundle de Leaflet.");
        $.util.log(" --vg : construction du bundle 3D de VirtualGeo.");
    });

    //|**~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    //| ✓ jshint
    //| > Helps to detect errors and potential problems in code.
    //| > http://jscs.info/rules.html
    //'~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
    gulp.task("jshint", function () {

        var jshint = require("gulp-jshint");

        var src = [];
        (isExecuteOl3) ? src.push(_src.js.ol3) : (isExecuteLeaflet) ? src.push(_src.js.leaflet) : (isExecuteVg) ? src.push(_src.js.vg) : null;
        src.push(_src.js.common);
        var exclude = "!" + path.join(_dir.src, "**", "__*.js");
        src.push(exclude);

        return gulp.src(src)
            .pipe($.plumber())
            .pipe(jshint(".jshintrc"))
            .pipe(jshint.reporter("default"));
    });

    //|**~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    //| ✓ jscs
    //| > Coding conventions respect
    //| > http://jscs.info/rules.html
    //'~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
    gulp.task("jscs", function () {

        var src = [];
        (isExecuteOl3) ? src.push(_src.js.ol3) : (isExecuteLeaflet) ? src.push(_src.js.leaflet) : (isExecuteVg) ? src.push(_src.js.vg) : null;
        src.push(_src.js.common);
        var exclude = "!" + path.join(_dir.src, "**", "__*.js");
        src.push(exclude);

        return gulp.src(src)
            .pipe($.plumber())
            .pipe($.jscs());
    });

    //|**~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    //| ✓ mocha with phantomJS
    //| > JavaScript test framework running on node.js and the browser
    //| > http://mochajs.org/
    //| > https://www.npmjs.com/package/gulp-mocha-phantomjs
    //'~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
    gulp.task("mocha-phantomjs", function () {

        var gmochaPhantomJS = require("gulp-mocha-phantomjs");

        var src = [];
        var file = (isExecuteOl3) ? "index-ol3.html" : (isExecuteLeaflet) ? "index-leaflet.html" : (isExecuteVg) ? "index-vg.html" : $.util.log("Exception!");
        src.push(path.join(_dir.test, file));
        src.push(path.join(_dir.test, "index.html"));

        return gulp.src(src)
            .pipe(gmochaPhantomJS({
                reporter : "spec"
            }));
    });

    //|**~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    //| ✓ woodman
    //| > Cleaning woodman logger.
    //| > http://joshfire.github.io/woodman/getstarted.html
    //'~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
    gulp.task("clean-logger", ["sources"] , function () {

        var builddir = null;
        var baseSrcDir = path.join(_build, "src");
        var srcdir   = null;

        if (isExecuteOl3) {
            srcdir = path.join(baseSrcDir, "Ol3");
            builddir = path.join(ol3BuildDir, _dir.src);
            $.shelljs.exec("node ./node_modules/woodman/precompile/precompiler.js " + srcdir + " " + path.join(builddir, "Ol3"));
        } else if (isExecuteLeaflet) {
            srcdir = path.join(baseSrcDir, "Leaflet");
            builddir = path.join(leafletBuildDir, _dir.src);
            $.shelljs.exec("node ./node_modules/woodman/precompile/precompiler.js " + srcdir + " " + path.join(builddir, "Leaflet"));
        } else if (isExecuteVg) {
            srcdir = path.join(baseSrcDir, "Vg");
            builddir = path.join(vgBuildDir, _dir.src);
            $.shelljs.exec("node ./node_modules/woodman/precompile/precompiler.js " + srcdir + " " + path.join(builddir, "Vg"));
        } else {
            $.util.log("Exception !");
        }

        // sources communes
        var srcdircommon = path.join(baseSrcDir, "Common");
        $.shelljs.exec("node ./node_modules/woodman/precompile/precompiler.js " + srcdircommon + " " + path.join(builddir, "Common"));

        // on retourne la config
        return gulp.src(path.join(baseSrcDir, "*.js"))
            .pipe(gulp.dest(builddir))
            .pipe($.plumber());

    });

    // |**~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // | ✓ sources
    // | > copie des sources js avec remplacement variables
    // '~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
    gulp.task("sources", function () {

        var replace = require("gulp-replace");
        var buildDir = path.join(_build, "src");

        var except = "!" + path.join(_dir.src, "**/__*.js");
        return gulp.src([path.join(_dir.src, "**/*.js"), except])
               .pipe(replace(/__GPLEAFLETEXTVERSION__/g,npmConf.leafletExtVersion))
               .pipe(replace(/__GPOL3EXTVERSION__/g,npmConf.ol3ExtVersion))
               .pipe(replace(/__GPDATE__/g,buildDate))
               .pipe(gulp.dest(buildDir))
               .pipe($.plumber())
               .pipe($.size()) ;
    });

    //|**~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    //| ✓ requirejs avec optimisation avec amdclean
    //| > Framework RequireJS
    //| > https://github.com/gfranko/amdclean
    //| > principe -> http://requirejs.org/docs/optimization.html
    //| > options  -> https://github.com/jrburke/r.js/blob/master/build/example.build.js
    //| > astuces  -> http://stackoverflow.com/questions/23978361/using-gulp-to-build-requirejs-project-gulp-requirejs
    //'~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
    gulp.task("requirejs-amdclean", ["clean-logger"], function (taskReady) {

        var requirejs = require("requirejs");

        // Pour information,
        // les valeurs possibles sont les suivantes :
        // uglify, uglify2, closure, or closure.keepLines
        var mode = "none";
        if (isProduction) {
            $.util.log("Ok, optimization mode");
            mode = "uglify2";
        }

        var builddir = null;
        var srcdir = null;
        var input  = ["Common/Utils/AutoLoadConfig"]; // on place les modules qui ne sont pas appellés directement dans le code (dependances) !
        var plugin = null;
        var deps = {
            ol : "empty:",
            leaflet : "empty:",
            vg : "empty:",
            proj4 : "../../../../lib/proj4/proj4" + modeExt,
            gp : "../../../../lib/gp/GpServices" + modeExt,
            sortable : "../../../../lib/sortable/Sortable-src" // + modeExt
        };

        if (isExecuteOl3) {
            builddir =  path.join(_build, "Ol3", "js");
            srcdir = path.join(_build, "Ol3", _dir.src);
            plugin = ol3OutputNameBase;
            input.push(path.join("Ol3", plugin));
            // on ajoute cette classe pour ol3,
            // mais pourquoi ce module n'est pas une dependance dans le code ?
            input.push(path.join("Ol3", "CRS", "CRS"));
        } else if (isExecuteLeaflet) {
            builddir =  path.join(_build, "Leaflet", "js");
            srcdir = path.join(_build, "Leaflet", _dir.src);
            plugin = leafletOutputNameBase;
            input.push(path.join("Leaflet", plugin));
            // on ajoute ce projet pour leaflet
            deps["proj4leaflet-0.7.x"] = "../../../../lib/proj4leaflet/proj4leaflet" + modeExt;
            deps["proj4leaflet-1.0.x"] = "../../../../lib/proj4leaflet/1.0.0-beta.2/proj4leaflet" + modeExt;
            deps["leaflet-draw" ] = "../../../../lib/leaflet/plugins/leaflet-draw/leaflet.draw" + modeExt;
        } else if (isExecuteVg) {
            builddir =  path.join(_build, "Vg", "js");
            srcdir = path.join(_build, "Vg", _dir.src);
            plugin = vgOutputNameBase;
            input.push(path.join("Vg", plugin));
        } else {
            $.util.log("Exception !");
        }

        requirejs.optimize({
            mainConfigFile : path.join(srcdir, "Config.js"),
            paths : deps,
            baseUrl : srcdir,
            optimize : mode,
            uglify2 : {
                output: {
                    beautify: false
                },
                warnings: false,
                mangle: (isProduction) ? true : false
            },
            include : input,
            out : path.join(builddir, plugin + modeExt + ".js"),
            findNestedDependencies : false,
            preserveLicenseComments : false,
            useStrict : true,
            onModuleBundleComplete : function (data) {

                var fs = require("fs"),
                         amdclean = require("amdclean"),
                         outputFile = data.path;

                fs.writeFileSync(outputFile, amdclean.clean({
                    globalModules : ['proj4'], // module globale !
                    filePath : outputFile,
                    prefixMode : "camelCase",
                    wrap : {
                        start : "\n/* BEGIN CODE */\n",
                        end : "\n/* END CODE   */\n"
                       },
                    "escodegen" : {
                         "comment" :false,
                         "format" : {
                           "indent" : {
                             "style" : "    ",
                             "adjustMultilineComment" :true
                           }
                         }
                       }
                }));
            }
        }, function () {
            taskReady();
        }, function (error) {
            console.error("requirejs task failed!?", JSON.stringify(error));
            process.exit(1);
        });
    });

    //|**~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    //| ✓ umd
    //| > Framework UMD
    //| > https://github.com/umdjs/umd
    //| > https://www.npmjs.com/package/gulp-umd
    //'~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
    gulp.task("umd", ["requirejs-amdclean"], function () {

        var umd = require("gulp-umd");

        var builddir= null;
        var srcdir  = null;
        var deps    = null;
        var output  = null;
        if (isExecuteOl3) {
            builddir = path.join(_build, "Ol3", "umd");
            srcdir = path.join(_build, "Ol3", "js");
            deps = [{name :"ol", amd :"ol", cjs :"ol", global :"ol", param :"ol"}];
            output  = ol3OutputNameBase;
        }
        else if (isExecuteLeaflet) {
            builddir = path.join(_build, "Leaflet", "umd");
            srcdir = path.join(_build, "Leaflet", "js");
            deps = [{name :"leaflet", amd :"leaflet", cjs :"leaflet", global :"L", param :"leaflet"}];
            output  = leafletOutputNameBase;
        }
        else if (isExecuteVg) {
            builddir = path.join(_build, "Vg", "umd");
            srcdir = path.join(_build, "Vg", "js");
            // FIXME VirtualGeo est global en mode browser uniquement ! Pas de mode AMD...
            // deps = [{name :"vg", amd :"vg", cjs :"vg", global :"VirtualGeo", param :"vg"}];
            output  = vgOutputNameBase;
        }
        else {
            $.util.log("Exception !");
        }

        return gulp.src(path.join(srcdir, output + modeExt + ".js"))
            .pipe(umd({
                exports: function (file) {
                    return "Gp" ;
                },
                namespace: function (file) {
                    return "Gp" ;
                },
                dependencies: function(file) {
                  return deps || [];
                }
            }))
            .pipe(gulp.dest(builddir))
            .pipe($.plumber())
            .pipe($.size());
    });

    //|**~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    //| ✓ copy images
    //| > https://github.com/hparra/gulp-rename
    //'~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
    gulp.task("res-images", function () {

        var rename = require("gulp-rename");

        var builddir  = null;
        var srcdir    = [];
        var commondir = path.join(_dir.res, "common", "**", "*.gif");
        srcdir.push(commondir);

        if (isExecuteOl3) {
            srcdir.push(path.join(_dir.res, "ol3", "**", "*.png"));
            srcdir.push(path.join(_dir.res, "ol3", "**", "*.svg"));
            //  GC : skip compress images ...
            //  builddir  = path.join(_build, "Ol3", "img");
            builddir  = path.join(_build, "Ol3", "dist/ol3/img");
        }
        else if (isExecuteLeaflet) {
            srcdir.push(path.join(_dir.res, "leaflet", "**", "*.png"));
            var plugindir = path.join(_dir.lib, "leaflet", "plugins", "leaflet-draw", "**", "*.png");
            srcdir.push(plugindir);
            //  GC : skip compress images ...
            //  builddir  = path.join(_build, "Leaflet", "img");
            builddir  = path.join(_build, "Leaflet", "dist/leaflet/img");
        }
        else if (isExecuteVg) {
            srcdir.push(path.join(_dir.res, "vg", "**", "*.png"));
            //  GC : skip compress images ...
            //  builddir  = path.join(_build, "Leaflet", "img");
            builddir  = path.join(_build, "Vg", "dist/vg/img");
        }
        else {
            $.util.log("Exception !");
        }

        return gulp.src(srcdir)
            .pipe(rename({dirname :""}))
            .pipe(gulp.dest(builddir))
            .pipe($.plumber())
            .pipe($.size());

    });

    //|**~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    //| ✓ compress images
    //| FIXME : tache desactivee (pb de build selon environnement)
    //| > https://github.com/sindresorhus/gulp-imagemin
    //| > https://github.com/imagemin/imagemin-optipng
    //'~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
    gulp.task("images", ["res-images"], function () {

        var imagemin = require("gulp-imagemin");
        var pngquant = require("imagemin-pngquant");

        var builddir = null;
        var srcdir   = null;

        if (isExecuteOl3) {
            srcdir =  path.join(_build, "Ol3", "**", "*.png");
            builddir  = path.join(_build, "Ol3", "dist/ol3");
        }
        else if (isExecuteLeaflet) {
            srcdir =  path.join(_build, "Leaflet", "**", "*.png");
            builddir  = path.join(_build, "Leaflet", "dist/leaflet");
        }
        else {
            $.util.log("Exception !");
        }

        return gulp.src(srcdir)
            .pipe(imagemin({
                progressive: true,
                svgoPlugins: [{removeViewBox: false}],
                use: [pngquant()]
            }))
            .pipe(gulp.dest(builddir))
            .pipe($.plumber())
            .pipe($.size());
    });

    //|**~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    //| ✓ minify css with clean-css
    //| > https://www.npmjs.com/package/gulp-minify-css
    //'~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
    gulp.task("res-styles", function () {

        var minifyCss = require("gulp-minify-css");
        var concat    = require("gulp-concat");

        var builddir = null;
        var srcdir   = null;
        var plugindir = null;
        var exceptsrcdir = null;
        var srcdircommon = path.join(_dir.res, "common", "*.css");
        var exceptsrcdircommon = "!" + path.join(_dir.res, "common", "__*.css");
        var output = null;

        if (isExecuteOl3) {
            srcdir = path.join(_dir.res, "ol3", "**", "*.css");
            exceptsrcdir = "!" + path.join(_dir.res, "ol3", "**", "__*.css");
            builddir = path.join(_build, "Ol3", "dist/ol3");
            output = ol3OutputNameBase + modeExt ;
        }
        else if (isExecuteLeaflet) {
            srcdir = path.join(_dir.res, "leaflet", "**", "*.css");
            plugindir = path.join(_dir.lib, "leaflet", "plugins", "leaflet-draw", "**", "*.css");
            exceptsrcdir = "!" + path.join(_dir.res, "leaflet", "**", "__*.css");
            builddir  = path.join(_build, "Leaflet", "dist/leaflet");
            output = leafletOutputNameBase + modeExt ;
        }
        else if (isExecuteVg) {
            srcdir = path.join(_dir.res, "vg", "**", "*.css");
            exceptsrcdir = "!" + path.join(_dir.res, "vg", "**", "__*.css");
            builddir  = path.join(_build, "Vg", "dist/vg");
            output = vgOutputNameBase + modeExt ;
        }
        else {
            $.util.log("Exception !");
        }

        var srcArray =  [] ;
        if (srcdircommon) srcArray.push(srcdircommon) ;
        if (srcdir) srcArray.push(srcdir) ;
        if (plugindir) srcArray.push(plugindir) ;
        if (exceptsrcdir) srcArray.push(exceptsrcdir) ;
        if (exceptsrcdircommon) srcArray.push(exceptsrcdircommon) ;
        // return gulp.src([srcdircommon, srcdir, plugindir, exceptsrcdir, exceptsrcdircommon])
        return gulp.src(srcArray)
            .pipe((isProduction) ? minifyCss(/*{compatibility :"ie8"}*/) : $.util.noop())
            .pipe(concat(output + ".css"))
            .pipe(gulp.dest(builddir))
            .pipe($.plumber())
            .pipe($.size());
    });

    //|**~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    //| ✓ header-js
    //| > ajout d"une licence au bundle js
    //| > https://www.npmjs.com/package/gulp-header
    //'~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
    gulp.task("header-js", function () {

        // pour information,
        // le fichier de licence peut être un template,
        // les balises en nottion ES6-style : ${date}
        var fs      = require("fs");
        var header  = require("gulp-header");
        var strip = require('gulp-strip-comments');

        var builddir = null;
        var srcdir  = null;
        var output = null;
        var brief = null ;
        var version = null ;
        if (isExecuteOl3) {
            srcdir    = path.join(_build, "Ol3", "dist/ol3");
            builddir  = path.join(_build, "Ol3", "dist/ol3");
            output = ol3OutputNameBase + modeExt ;
            version = npmConf.ol3ExtVersion ;
            brief = npmConf.ol3ExtName ;
        }
        else if (isExecuteLeaflet) {
            srcdir    = path.join(_build, "Leaflet", "dist/leaflet");
            builddir  = path.join(_build, "Leaflet", "dist/leaflet");
            output = leafletOutputNameBase + modeExt ;
            version = npmConf.leafletExtVersion ;
            brief = npmConf.leafletExtName ;
        }
        else if (isExecuteVg) {
            srcdir    = path.join(_build, "Vg", "dist/vg");
            builddir  = path.join(_build, "Vg", "dist/vg");
            output = vgOutputNameBase + modeExt ;
            version = npmConf.vgExtVersion ;
            brief = npmConf.vgExtName ;
        }
        else {
            $.util.log("Exception !");
        }

        return gulp.src([path.join(srcdir, output + ".js")])
                .pipe(strip({safe : false})) // first remove old headers comments
                .pipe(header( (isExecuteLeaflet) ? fs.readFileSync("utils/licence-proj4Leaflet.txt" , "utf8") : ""))
                .pipe(header( (isExecuteLeaflet) ? fs.readFileSync("utils/licence-plugin-leaflet-draw.txt" , "utf8") : ""))
                .pipe(header(fs.readFileSync("utils/licence-proj4js.txt", "utf8")))
                .pipe(header(fs.readFileSync("utils/licence-sortable.txt", "utf8")))
                .pipe(header(fs.readFileSync("utils/licence-es6promise.txt", "utf8")))
                .pipe(header(fs.readFileSync("utils/licence-template.txt" , "utf8"), {
                    date : buildDate,
                    version : version,
                    brief : brief
                }))
                .pipe(gulp.dest(builddir))
                .pipe($.plumber())
                .pipe($.size()) ;
    });

    // |**~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // | ✓ header-css
    // | > ajout d"une licence au bundle css
    // | > https://www.npmjs.com/package/gulp-header
    //'~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
    gulp.task("header-css", function () {

        //  pour information,
        //  le fichier de licence peut être un template,
        //  les balises en nottion ES6-style : ${date}
        var fs      = require("fs");
        var header  = require("gulp-header");

        var builddir = null ;
        var srcdir  = null ;
        var output = null ;
        var brief = null ;
        var version = null ;
        if (isExecuteOl3) {
            srcdir    = path.join(_build, "Ol3", "dist/ol3");
            builddir  = path.join(_build, "Ol3", "dist/ol3");
            output = ol3OutputNameBase + modeExt ;
            version = npmConf.ol3ExtVersion ;
            brief = npmConf.ol3ExtName ;
        }
        else if (isExecuteLeaflet) {
            srcdir    = path.join(_build, "Leaflet", "dist/leaflet");
            builddir  = path.join(_build, "Leaflet", "dist/leaflet");
            output = leafletOutputNameBase + modeExt ;
            version = npmConf.leafletExtVersion ;
            brief = npmConf.leafletExtName ;
        }
        else if (isExecuteVg) {
            srcdir    = path.join(_build, "Vg", "dist/vg");
            builddir  = path.join(_build, "Vg", "dist/vg");
            output = vgOutputNameBase + modeExt ;
            version = npmConf.vgExtVersion ;
            brief = npmConf.vgExtName ;
        }
        else {
            $.util.log("Exception !");
        }

        return gulp.src([path.join(srcdir, output + ".css")])
                .pipe(header(fs.readFileSync("utils/licence-template.txt" , "utf8"), {
                    date : buildDate,
                    version : version,
                    brief : brief
                }))
                .pipe(gulp.dest(builddir))
                .pipe($.plumber())
                .pipe($.size()) ;
    });

    //|**~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    //| ✓ copy-libjsdoc
    //| > copie du template jaguarjs-jsdoc
    //'~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
    gulp.task("copy-libjsdoc", function () {

        var builddir = (isExecuteOl3) ? path.join(_build, "Ol3", "doc") : (isExecuteLeaflet) ? path.join(_build, "Leaflet", "doc") : (isExecuteVg) ? path.join(_build, "Vg", "doc") : $.util.log("Exception !");

        return gulp.src(path.join(_dir.doc, "**"))
                .pipe(gulp.dest(builddir))
                .pipe($.plumber())
                .pipe($.size());
    });

    //|**~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    //| ✓ copy-tutojsdoc
    //| > copie du template jaguarjs-jsdoc
    //'~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
    gulp.task("copy-tutojsdoc", function () {

        var builddir = (isExecuteOl3) ? path.join(_build, "Ol3", "doc", "tutorials") : (isExecuteLeaflet) ? path.join(_build, "Leaflet", "doc", "tutorials") : (isExecuteVg) ? path.join(_build, "Vg", "doc", "tutorials") : $.util.log("Exception !");

        var tmpl = require("gulp-template");

        // FIXME copie uniquement des tuto du framework !
        return gulp.src(path.join(_dir.doc, "tutorials/*.md"))
                .pipe(tmpl({
                    mode : modeExt
                }))
                .pipe(gulp.dest(builddir))
                .pipe($.plumber())
                .pipe($.size());
    });
    //|**~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    //| ✓ jsdoc
    //| > Documenting JavaScript with JSDoc.
    //| > http://usejsdoc.org
    //| > FIXME trouver un plugin capable de realiser la même chose que jsdoc-cli
    //'~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
    gulp.task("jsdoc", function () {

        var configfile = (isExecuteOl3) ? "jsdoc-ol3.json" :
                            (isExecuteLeaflet) ? "jsdoc-leaflet.json" :
                                $.util.log("Exception !");

        $.shelljs.exec("./node_modules/.bin/jsdoc -c " + configfile);

        // cf. https://www.npmjs.com/package/gulp-jsdoc3
        // var jsdoc = require("gulp-jsdoc3");
        //
        // // liste des sources
        // var src = [];
        // (isExecuteOl3) ? src.push(_src.js.ol3) : (isExecuteLeaflet) ? src.push(_src.js.leaflet) : null;
        // src.push(_src.js.common);
        //  var exclude = "!" + " " + path.join(_dir.src, "**", "__*.js");
        // src.push(exclude);
        //
        // // config
        //  var configfile = (isExecuteOl3) ? path.join(_build, "Ol3", "doc", "jsdoc-ol3.json") :
        //                      (isExecuteLeaflet) ? path.join(_build, "Leaflet", "doc", "jsdoc-leaflet.json") :
        //                         $.util.log("Exception !");
        //
        //  var config = require("./" + configfile);
        //
        // return gulp.src(src, {read: false})
        //     .pipe(jsdoc(config));

    });

    // |**~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // | ✓ copy-dist
    // | > copie du bundle dans dist/
    //'~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
    gulp.task("copy-dist", function () {

        var name    = (isExecuteOl3) ? ol3OutputNameBase : (isExecuteLeaflet) ? leafletOutputNameBase : (isExecuteVg) ? vgOutputNameBase : null;
        var baseDir = (isExecuteOl3) ? "Ol3" : (isExecuteLeaflet) ? "Leaflet" : (isExecuteVg) ? "Vg" : null;
        var srcDir  = (isExecuteOl3) ? "ol3" : (isExecuteLeaflet) ? "leaflet" : (isExecuteVg) ? "vg" : null;
        var src     = path.join(_build, baseDir, "umd", name + modeExt + ".js");

        return gulp.src(src)
            .pipe(gulp.dest(path.join(_build, baseDir, "dist", srcDir)))
    });

    // |**~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // | ✓ lib-external
    // | > copie des lib externes leaflet ou ol3 dans lib/
    //'~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
    gulp.task("lib-external", function () {

        var baseDir  = (isExecuteOl3) ? "ol3" : (isExecuteLeaflet) ? "leaflet" : (isExecuteVg) ? "vg" : null;
        var buildDir = (isExecuteOl3) ? path.join(_build, "Ol3", "lib", baseDir) : (isExecuteLeaflet) ? path.join(_build, "Leaflet", "lib", baseDir) : (isExecuteVg) ? path.join(_build, "Vg", "lib", baseDir) : null;
        var srcDir   = path.join(_dir.lib, baseDir, "**", "*.*");

        return gulp.src(srcDir)
            .pipe(gulp.dest(buildDir))
    });

    // |**~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // | ✓ copy-sample
    // | > copie des exemples leaflet ou ol3 dans samples/
    //'~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
    gulp.task("copy-sample", function () {

        var baseDir  = (isExecuteOl3) ? "ol3" : (isExecuteLeaflet) ? "leaflet" : (isExecuteVg) ? "vg" : null;
        var buildDir = (isExecuteOl3) ? path.join(_build, "Ol3", "samples", baseDir) :
                            (isExecuteLeaflet) ? path.join(_build, "Leaflet", "samples", baseDir) :
                                (isExecuteVg) ? path.join(_build, "Vg", "samples", baseDir) :
                                    null;

        var sources  = [];
        // includes : les bundles
        sources.push(path.join(_dir.samples, baseDir, "**", "bundle*.html"));
        sources.push(path.join(_dir.samples, baseDir, "**", "index-bundle*.html"));
        // excludes : les tests (amd)
        sources.push("!" + path.join(_dir.samples, baseDir, "Test"));
        sources.push("!" + path.join(_dir.samples, baseDir, "Test/**"));

        return gulp.src(sources)
            .pipe(gulp.dest(buildDir));
    });

    // |**~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // | ✓ copy-resources-sample
    // | > copie des ressources des exemples leaflet ou ol3 dans samples/
    //'~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
    gulp.task("copy-resources-sample", function () {

        var baseDir  = (isExecuteOl3) ? "ol3" : (isExecuteLeaflet) ? "leaflet" : (isExecuteVg) ? "vg" : null;
        var buildDir = (isExecuteOl3) ? path.join(_build, "Ol3", "samples", "resources") :
                            (isExecuteLeaflet) ? path.join(_build, "Leaflet", "samples", "resources") :
                                (isExecuteVg) ? path.join(_build, "Vg", "samples", "resources") :
                                    null;

        var sources  = [];
        // includes : les ressources
        sources.push(path.join(_dir.samples, "resources", "**"));
        sources.push(path.join(_dir.samples, baseDir, "resources", "**"));

        return gulp.src(sources)
            .pipe(gulp.dest(buildDir));
    });

    // |**~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // | ✓ template-sample
    // | > construction de la page principale des exemples leaflet ou ol3
    // | > https://www.npmjs.com/package/gulp-template
    // | > FIXME les dependances des exemples !
    //'~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
    gulp.task("template-sample", function () {

        var tmpl = require("gulp-template");
        var glob = require("glob");

        var baseDir  = (isExecuteOl3) ? "ol3" : (isExecuteLeaflet) ? "leaflet" : (isExecuteVg) ? "vg" : null;
        var buildDir = (isExecuteOl3) ? path.join(_build, "Ol3", "samples") :
                            (isExecuteLeaflet) ? path.join(_build, "Leaflet", "samples") :
                                (isExecuteVg) ? path.join(_build, "Vg", "samples") :
                                    null;
        var sources  = path.join(/*_dir.samples, */ baseDir, "**", "*");
        var index    = path.join(_dir.samples, "index-" + baseDir + ".html");

        var lstSources = glob.sync(sources , {
            cwd : buildDir , nodir : true
        });

        console.log(lstSources);

        return gulp.src(index)
            .pipe(tmpl({
                'files' : lstSources,
                'mode' : modeExt // FIXME !
            }))
            .pipe(gulp.dest(path.join(buildDir)));
    });

    //|**~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    //| ✓ publish
    //| > copie du bundle pour distribution
    //'~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
    gulp.task("publish", function () {

        var srcdir = [];

        if (isExecuteOl3) {
            srcdir.push(path.join(_build, "Ol3", "dist", "**"));
        }

        if (isExecuteLeaflet) {
            srcdir.push(path.join(_build, "Leaflet", "dist", "**"));
        }

        if (isExecuteVg)  {
            srcdir.push(path.join(_build, "Vg", "dist", "**"));
        }

        return gulp.src(srcdir)
                .pipe(gulp.dest(_dir.dist))
                .pipe($.plumber())
                .pipe($.size()) ;
    });

    //|**~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    //| ✓ connect
    //| > https://www.npmjs.com/package/gulp-connect
    //'~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
    gulp.task('connect', function() {

        var baseDir = (isExecuteOl3) ? "Ol3" : (isExecuteLeaflet) ? "Leaflet" : (isExecuteVg) ? "Vg" : null;

        $.connect.server({
            root: path.join(_build, baseDir),
            port: 9000,
            livereload: false
        });
    });

    //|**~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    //| ✓ open
    //| > https://www.npmjs.com/package/open
    //'~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
    gulp.task('server', ['connect'], function() {

        var open = require('open');

        var baseName = (isExecuteOl3) ? "index-ol3.html" : (isExecuteLeaflet) ? "index-leaflet.html" : (isExecuteVg) ? "index-vg.html" : null;

        open("http://localhost:9000/samples/" + baseName);
    });

    //|**~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    //| ✓ clean
    //| > nettoyage
    //'~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
    gulp.task("clean", [], function () {

        var stream = gulp.src([
            _build
        ], {force: true});
        return stream.pipe($.clean());
    });

    //|**~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    //| ✓ clean
    //| > nettoyage brutal
    //| > https://github.com/robrich/gulp-rimraf
    //'~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
    gulp.task("clean-rimraf", [], function (cb) {
        var rimraf = require("rimraf");
        rimraf(_build, cb);
    });

    //|**~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    //| ✓ tâche = alias
    //'~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
    gulp.task("test",    ["mocha-phantomjs"]);          // raccourci !
    gulp.task("check",   ["jshint", "jscs"]);           // raccourci !
    gulp.task("res",     ["res-styles", "res-images"]); // raccourci !
    gulp.task("licence", ["header-css", "header-js"]);  // raccourci !
    gulp.task("lib",     ["lib-external"]);             // raccourci !
    gulp.task("dist",    ["build-dist"]);   //  tache sync. !
    gulp.task("doc",     ["build-doc"]);    //  tache sync. !
    gulp.task("sample",  ["build-sample"]); //  tache sync. !

    //|**~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    //| ✓ synchronisation des tâches
    //'~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
    var runSequence = require("run-sequence");

    gulp.task("build", function(cb) {
        if (isExecuteOl3 && isExecuteLeaflet) {
            runSequence("build-ol3", "build-leaflet", cb);
        }
        else if (isExecuteOl3) {
            gulp.start("build-ol3");
        }
        else if (isExecuteLeaflet) {
            gulp.start("build-leaflet");
        }
        else if (isExecuteVg) {
            gulp.start("build-vg");
        }
        else {
            runSequence("build-ol3", "build-leaflet", cb);
        }
    });

    gulp.task("build-ol3", function(cb) {
        isExecuteOl3 = true;
        isExecuteLeaflet = !isExecuteOl3;
        isExecuteVg = !isExecuteOl3;
        $.util.log("# Run task for OpenLayers3...");
        runSequence("check", /*"test",*/ "dist", "doc", "lib", "sample", cb);
    });

    gulp.task("build-leaflet", function(cb) {
        isExecuteLeaflet = true;
        isExecuteOl3 = !isExecuteLeaflet;
        isExecuteVg = !isExecuteLeaflet;
        $.util.log("# Run task for Leaflet...");
        runSequence("check", /*"test",*/ "dist", "doc", "lib", "sample", cb);
    });

    gulp.task("build-vg", function(cb) {
        isExecuteVg = true;
        isExecuteOl3 = !isExecuteVg;
        isExecuteLeaflet = !isExecuteVg;
        $.util.log("# Run task for VirtualGeo 3D...");
        runSequence("check", /*"test",*/ "dist", "doc", "lib", "sample", cb);
    });

    gulp.task("build-dist", function(cb) {
        runSequence("umd", "copy-dist", "res", "licence", cb);
    });

    gulp.task("build-doc", function(cb) {
        runSequence("copy-libjsdoc", "copy-tutojsdoc", "jsdoc", cb);
    });

    gulp.task("build-sample", function(cb) {
        runSequence("copy-sample", "copy-resources-sample", "template-sample", cb);
    });

    //|**~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    //| ✓ tâche par default
    //'~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
    gulp.task("default", ["clean"], function () {
        gulp.start("build");
    });

}(require("gulp"), require("gulp-load-plugins")));
