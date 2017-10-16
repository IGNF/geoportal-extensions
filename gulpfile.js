/* global process */
/*jshint -W098 */

(function (gulp, gulpLoadPlugins) {
    "use strict";

    // plugins
    var $ = gulpLoadPlugins({
        pattern : "*",
        lazy : true
    });

    // gestion des paths
    var path  = require("path");

    // |**~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // | ✓ Options
    // | > usage : gulp [task] [--production] [--mix]
    // | >              [--ol3] [--leaflet] [--vg] [--itowns]
    // "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
    var opts = require("minimist")(process.argv.slice(2));
    var fs = require("fs");

    // options de commandes
    var isProduction = opts.production;
    var isMix = opts.mix;

    // options de lib
    var isExecuteOl3     = opts.ol3;
    var isExecuteLeaflet = opts.leaflet;
    var isExecuteVg      = opts.vg;
    var isExecuteITowns  = opts.itowns; // TODO !!!

    // conf variables
    var npmConf = require("./package.json");
    var buildDate = new Date().toISOString().split("T")[0];

    // si aucune option n'est renseignée,
    // on construit les bundles pour OpenLayers3
    if (!isExecuteOl3 && !isExecuteLeaflet && !isExecuteVg && !isExecuteITowns) {
        isExecuteOl3 = true;
    }

    // gestion du mode mixte...
    var nExecute = 0;
    if (isExecuteOl3 || isExecuteLeaflet) {
        nExecute++;
    }
    if (isExecuteVg || isExecuteITowns) {
        nExecute++;
    }

    if (isMix && nExecute !== 2) {
        $.util.log("[ERREUR] Desactivation du mode mixte !!!");
        isMix = false;
    }

    var isExecuteOl3WithVg = false;
    var isExecuteLeafletWithVg = false;
    var isExecuteOl3WithITowns = false;
    var isExecuteLeafletWithITowns = false;

    /** ex. GpPluginOl3 */
    var getBaseFileName = function () {
        var baseFileName =
            (isExecuteOl3WithVg) ? "GpPluginOl3Vg" :
            (isExecuteOl3WithITowns) ? "GpPluginOl3ITowns" :
            (isExecuteLeafletWithVg) ? "GpPluginLeafletVg" :
            (isExecuteLeafletWithITowns) ? "GpPluginLeafletITowns" :
                (isExecuteOl3) ? "GpPluginOl3" :
                    (isExecuteLeaflet) ? "GpPluginLeaflet" :
                        (isExecuteVg) ? "GpPluginVg" :
                            (isExecuteITowns) ? "GpPluginITowns" : null;
        return baseFileName;
    };

    /** ex. GpPluginOl3-src.js */
    var getDistFileName = function () {
        var distFileName = (isProduction) ? getBaseFileName() + ".js" : getBaseFileName() + "-src.js";
        return distFileName;
    };

    /** ex. Ol3 */
    var getDistDirName = function () {
        var dirName =
            (isExecuteOl3WithVg ||
             isExecuteOl3WithITowns ||
             isExecuteLeafletWithVg ||
             isExecuteLeafletWithITowns) ? "Mix" :
                (isExecuteOl3) ? "Ol3" :
                    (isExecuteLeaflet) ? "Leaflet" :
                        (isExecuteVg) ? "Vg" :
                            (isExecuteITowns) ? "ITowns" : null;
        return dirName;
    };

    // liste des répertoires sources (ex. dir.src)
    var _dir = {
        src :     "src",
        clean :   "csrc", // clean des sources, cad sans logger !
        res :     "res",
        lib :     "lib",
        test :    "test",
        doc :     "doc",
        samples : "samples",
        dist :    "dist"
    };

    // répertoire de build racine par defaut
    var _build = path.join("target", "build");

    // liste des fichiers sources (ex. _src.js.lib)
    var _src = {
        js : {
            lib : path.join(_dir.src, getDistDirName() ,"**/*.js"),
            common : path.join(_dir.src, "Common", "**/*.js")
        },
        img : { // TODO ...
            lib : path.join(_dir.res, getDistDirName(), "img/*"),
            ctrl : path.join(_dir.res, getDistDirName(), "Controls/**/img/*"),
            common : path.join(_dir.res, "Common/img/*.gif")
        },
        css : { // TODO ...
            lib : path.join(_dir.res, getDistDirName(), "**/*.css"),
            common : path.join(_dir.res, "Common/*.css")
        }
    };

    // **~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    //  ✓ info
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
    gulp.task("info", function () {

        $.util.log("###########################################");
        $.util.log("# Mode production : " + ((isProduction) ? "OUI" : "non"));
        $.util.log("# Mode Mixte      : " + ((isMix) ? "OUI" : "non"));
        $.util.log("# Contruction du bundle \"Leaflet\" ?    : " + ((isExecuteLeaflet) ? "OUI" : "non"));
        $.util.log("# Contruction du bundle \"OpenLayers\" ? : " + ((isExecuteOl3) ? "OUI (par défaut)" : "non"));
        $.util.log("# Contruction du bundle \"VirtualGeo\" ? : " + ((isExecuteVg) ? "OUI" : "non"));
        $.util.log("# Contruction du bundle \"ITowns\" ?     : " + ((isExecuteITowns) ? "OUI" : "non"));
        $.util.log("###########################################");

    });

    // **~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    //  ✓ help
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
    gulp.task("help", function () {
        $.util.log("###########################################");
        $.util.log("# Liste des target principales :");
        $.util.log("# - build : construction complète du projet (target par defaut).");
        $.util.log("# -- dist  : construction du bundle.");
        $.util.log("# -- check : controle des sources.");
        $.util.log("# -- test : execution des tests unitaires.");
        $.util.log("# -- doc  : construction de la JSDOC.");
        $.util.log("# -- publish : publication de la librairie.");
        $.util.log("# Liste des options :");
        $.util.log("# --production : minification et aggregation des sources.");
        $.util.log("# --mix : fusion de librairie.");
        $.util.log("# --ol3 : construction du bundle de OpenLayers3.");
        $.util.log("# --leaflet : construction du bundle de Leaflet.");
        $.util.log("# --vg : construction du bundle 3D de VirtualGeo.");
        $.util.log("# --itowns : construction du bundle 3D de ITowns.");
        $.util.log("###########################################");
    });

    // **~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    //  ✓ jshint
    //  > Helps to detect errors and potential problems in code.
    //  > http://jscs.info/rules.html
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
    gulp.task("jshint", function () {

        var jshint = require("gulp-jshint");

        var src = [];
        src.push(_src.js.lib);
        src.push(_src.js.common);
        src.push("gulpfile.js");
        var exclude = "!" + path.join(_dir.src, "**", "__*.js");
        src.push(exclude);

        return gulp.src(src)
            .pipe($.plumber())
            .pipe(jshint(".jshintrc"))
            .pipe(jshint.reporter("default", {
                verbose : true
            }))
            .pipe(jshint.reporter("fail"));
    });

    // **~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    //  ✓ jscs
    //  > Coding conventions respect
    //  > http://jscs.info/rules.html
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
    gulp.task("jscs", function () {

        var jscs = require("gulp-jscs");

        var src = [];
        src.push(_src.js.lib);
        src.push(_src.js.common);
        src.push("gulpfile.js");
        var exclude = "!" + path.join(_dir.src, "**", "__*.js");
        src.push(exclude);

        return gulp.src(src)
            .pipe($.plumber())
            .pipe(jscs())
            .pipe(jscs.reporter())
            .pipe(jscs.reporter("fail")); // or "failImmediately" ?
    });

    // **~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    //  ✓ mocha with phantomJS
    //  > JavaScript test framework running on node.js and the browser
    //  > http://mochajs.org/
    //  > https://www.npmjs.com/package/gulp-mocha-phantomjs
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
    gulp.task("mocha-phantomjs", function () {

        var gmochaPhantomJS = require("gulp-mocha-phantomjs");

        var src = [];
        var file = "index-" + getDistDirName().toLowerCase() + ".html";
        src.push(path.join(_dir.test, file));
        src.push(path.join(_dir.test, "index.html"));

        return gulp.src(src)
            .pipe(gmochaPhantomJS({
                reporter : "spec"
            }));
    });

    // **~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    //  ✓ woodman
    //  > Cleaning woodman logger.
    //  > http://joshfire.github.io/woodman/getstarted.html
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
    gulp.task("clean-logger", [] , function () {

        var builddir = path.join(_build, getDistDirName(), _dir.clean);
        var basedir  = path.join(_build, "src");
        var srcdir   = path.join(basedir, getDistDirName());

        $.shelljs.exec("node " + path.join("node_modules", "woodman", "precompile", "precompiler.js") + " " + srcdir + " " + path.join(builddir, getDistDirName()));
        $.shelljs.exec("node " + path.join("node_modules", "woodman", "precompile", "precompiler.js") + " " + path.join(basedir, "Common") + " " + path.join(builddir, "Common"));

        // on retourne la config
        return gulp.src(path.join(basedir, "*.js"))
            .pipe(gulp.dest(builddir))
            .pipe($.plumber());

    });

    gulp.task("clean-logger-mix", [] , function () {

        var builddir = path.join(_build, getDistDirName(), _dir.clean);
        var srcdir  = path.join(_build, "src");

        $.shelljs.exec("node " + path.join("node_modules", "woodman", "precompile", "precompiler.js") + " " + srcdir + " " + builddir);

        // on retourne la config
        return gulp.src(path.join(srcdir, "*.js"))
            .pipe(gulp.dest(builddir))
            .pipe($.plumber());

    });

    // |**~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // | ✓ sources
    // | > copie des sources js avec remplacement variables
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
    gulp.task("source-js", function () {

        var replace = require("gulp-replace");

        var builddir = path.join(_build, "src", getDistDirName());
        var srcdir   = [];
        srcdir.push(path.join(_dir.src, getDistDirName(), "**", "*.js"));

        var except = "!" + path.join(_dir.src, "**", "__*.js");
        srcdir.push(except);

        return gulp.src(srcdir)
               .pipe(replace(/__GPLEAFLETEXTVERSION__/g,npmConf.leafletExtVersion))
               .pipe(replace(/__GPOL3EXTVERSION__/g,npmConf.ol3ExtVersion))
               .pipe(replace(/__GPDATE__/g,buildDate))
               .pipe(gulp.dest(builddir))
               .pipe($.plumber())
               .pipe($.size()) ;
    });

    // |**~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // | ✓ sources
    // | > copie des sources js avec remplacement variables
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
    gulp.task("source-common", function () {

        var replace = require("gulp-replace");

        var builddir = path.join(_build, "src", "Common");
        var srcdir   = [];
        srcdir.push(path.join(_dir.src, "Common", "**", "*.js"));

        var except = "!" + path.join(_dir.src, "**", "__*.js");
        srcdir.push(except);

        return gulp.src(srcdir)
               .pipe(replace(/__GPLEAFLETEXTVERSION__/g,npmConf.leafletExtVersion))
               .pipe(replace(/__GPOL3EXTVERSION__/g,npmConf.ol3ExtVersion))
               .pipe(replace(/__GPDATE__/g,buildDate))
               .pipe(gulp.dest(builddir))
               .pipe($.plumber())
               .pipe($.size()) ;
    });

    // **~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    //  ✓ requirejs avec optimisation avec amdclean
    //  > Framework RequireJS
    //  > https://github.com/gfranko/amdclean
    //  > principe -> http://requirejs.org/docs/optimization.html
    //  > options  -> https://github.com/jrburke/r.js/blob/master/build/example.build.js
    //  > astuces  -> http://stackoverflow.com/questions/23978361/using-gulp-to-build-requirejs-project-gulp-requirejs
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
    gulp.task("requirejs-amdclean", [], function (taskReady) {

        // Pour information, (https://github.com/requirejs/r.js/pull/907)
        // Config like name, include, exclude, insertRequire, stubModules,
        // rawText, these deal with module IDs.
        // File path configs like appDir, baseUrl, dir, out, those are all paths
        // since they deal with the file system.

        var requirejs = require("requirejs");

        // Pour information,
        // les valeurs possibles sont les suivantes :
        // uglify, uglify2, closure, or closure.keepLines
        var mode = "none";
        if (isProduction) {
            $.util.log("Utilisation du mode optimisé...");
            mode = "uglify2";
        }

        var builddir = path.join(_build, getDistDirName(), "js");
        var srcdir   = path.join(_build, getDistDirName(), _dir.clean);
        var input    = []; // on place les modules qui ne sont pas appellés directement dans le code (dependances) !
        input.push("Common/Utils/AutoLoadConfig");
        input.push(getDistDirName() + "/" + getBaseFileName());

        var deps = {
            ol : "empty:",
            leaflet : "empty:",
            vg : "empty:",
            request : "empty:", // depenance externe pour nodejs !
            xmldom : "empty:",  // depenance externe pour nodejs !
            proj4 : "../../../../node_modules/proj4/dist/proj4-src" /*+ modeExt*/,
            gp : "../../../../node_modules/geoportal-access-lib/dist/GpServices-src"  /*+ modeExt */,
            sortable : "../../../../node_modules/sortablejs/Sortable" /*+ modeExt */
        };

        if (isExecuteOl3) {
            // FIXME on ajoute cette classe pour ol3,
            // mais pourquoi ce module n"est pas une dependance dans le code ?
            input.push(path.join(getDistDirName(), "CRS", "CRS"));
        } else if (isExecuteLeaflet) {
            // on ajoute ce projet pour leaflet
            deps["proj4leaflet"]  = "../../../../node_modules/proj4leaflet/src/proj4leaflet"  /*+ modeExt*/;
            deps["leaflet-draw" ] = "../../../../node_modules/leaflet-draw/dist/leaflet.draw-src" /*+ modeExt*/;
        } else if (isExecuteVg) {
            // do nothing
            $.util.log("executVg : nothing to do");
        } else if (isExecuteITowns) {
            $.util.log("executITowns : nothing to do");
        } else {
            $.util.log("Exception !");
        }

        requirejs.optimize({
            mainConfigFile : path.join(_dir.src, "Config.js"),
            paths : deps,
            baseUrl : srcdir,
            optimize : mode,
            uglify2 : {
                output : {
                    beautify : false
                },
                warnings : false,
                mangle : (isProduction) ? true : false
            },
            include : input,
            out : path.join(builddir, getDistFileName()),
            findNestedDependencies : false,
            preserveLicenseComments : false,
            useStrict : true,
            /** TODO : jsdoc*/
            onModuleBundleComplete : function (data) {

                console.log("onModuleBundleComplete", data);
                var amdclean = require("amdclean") ;
                var outputFile = data.path;

                var content = fs.readFileSync(outputFile, "utf8", function (err, data) {});

                fs.writeFileSync(outputFile, amdclean.clean({
                    globalModules : ["proj4"], // module globale !
                    // filePath : outputFile,
                    code : content.replace("var L, proj4;", ""),
                    prefixMode : "camelCase",
                    wrap : {
                        // FIXME petite bidouille interne avec les dependances nodejs...
                        // même si le bundle n'est compatible nodejs...
                        start : "\n/* BEGIN CODE */\nvar request, xmldom;\n",
                        end : "\n/* END CODE   */\n"
                    },
                    escodegen : {
                        comment : false,
                        format : {
                            indent : {
                                style : "    ",
                                adjustMultilineComment : true
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

    gulp.task("requirejs-amdclean-mix", [], function (taskReady) {
        var requirejs = require("requirejs");

        // Pour information,
        // les valeurs possibles sont les suivantes :
        // uglify, uglify2, closure, or closure.keepLines
        var mode = "none";
        if (isProduction) {
            $.util.log("Utilisation du mode optimisé...");
            mode = "uglify2";
        }

        var builddir = path.join(_build, getDistDirName(), "js");
        var srcdir   = path.join(_build, getDistDirName(), _dir.clean);
        var input    = []; // on place les modules qui ne sont pas appellés directement dans le code (dependances) !

        var deps = {
            ol : "empty:",
            leaflet : "empty:",
            vg : "empty:",
            request : "empty:", // depenance externe pour nodejs !
            xmldom : "empty:",  // depenance externe pour nodejs !
            proj4 : "../../../../node_modules/proj4/dist/proj4-src" /*+ modeExt*/,
            gp : "../../../../node_modules/geoportal-access-lib/dist/GpServices-src"  /*+ modeExt */,
            sortable : "../../../../node_modules/sortablejs/Sortable" /*+ modeExt */
        };

        if (isExecuteOl3WithVg) {
            input.push("Common/Utils/AutoLoadConfig");
            input.push("Ol3/GpPluginOl3");
            input.push("Vg/GpPluginVg");
            input.push("Ol3/CRS/CRS"); // FIXME ???
        }

        if (isExecuteLeafletWithVg) {
            input.push("Common/Utils/AutoLoadConfig");
            input.push("Leaflet/GpPluginLeaflet");
            input.push("Vg/GpPluginVg");
            // on ajoute ce projet pour leaflet
            deps["proj4leaflet"] = "../../../../node_modules/proj4leaflet/src/proj4leaflet"  /*+ modeExt*/;
            deps["leaflet-draw" ] = "../../../../node_modules/leaflet-draw/dist/leaflet.draw-src" /*+ modeExt*/;
        }

        if (isExecuteOl3WithITowns) {
            input.push("Common/Utils/AutoLoadConfig");
            input.push("Ol3/GpPluginOl3");
            input.push("ITowns/GpPluginITowns");
            input.push("Ol3/CRS/CRS"); // FIXME ???
        }

        if (isExecuteLeafletWithITowns) {
            input.push("Common/Utils/AutoLoadConfig");
            input.push("Leaflet/GpPluginLeaflet");
            input.push("ITowns/GpPluginITowns");
            // on ajoute ce projet pour leaflet
            deps["proj4leaflet"] = "../../../../node_modules/proj4leaflet/src/proj4leaflet"  /*+ modeExt*/;
            deps["leaflet-draw" ] = "../../../../node_modules/leaflet-draw/dist/leaflet.draw-src" /*+ modeExt*/;
        }

        requirejs.optimize({
            mainConfigFile : path.join(_dir.src, "Config.js"),
            paths : deps,
            baseUrl : srcdir,
            optimize : mode,
            uglify2 : {
                output : {
                    beautify : false
                },
                warnings : false,
                mangle : (isProduction) ? true : false
            },
            include : input,
            out : path.join(builddir, getDistFileName()),
            findNestedDependencies : false,
            preserveLicenseComments : false,
            useStrict : true,
            /** onModuleBundleComplete */
            onModuleBundleComplete : function (data) {

                var amdclean = require("amdclean") ;
                var outputFile = data.path;

                fs.writeFileSync(outputFile, amdclean.clean({
                    globalModules : ["proj4"], // module globale !
                    filePath : outputFile,
                    prefixMode : "camelCase",
                    wrap : {
                        // FIXME petite bidouille interne avec les dependances nodejs...
                        // même si le bundle n'est compatible nodejs...
                        start : "\n/* BEGIN CODE */\nvar request, xmldom;\n",
                        end : "\n/* END CODE   */\n"
                    },
                    escodegen : {
                         comment : false,
                         format : {
                             indent : {
                                 style : "    ",
                                 adjustMultilineComment : true
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

    // **~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    //  ✓ umd
    //  > Framework UMD
    //  > https://github.com/umdjs/umd
    //  > https://www.npmjs.com/package/gulp-umd
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
    gulp.task("umd", ["requirejs-amdclean"], function () {

        var umd = require("gulp-umd");

        var builddir = path.join(_build, getDistDirName(), "umd");
        var srcdir   = path.join(_build, getDistDirName(), "js");
        var deps     = null;

        if (isExecuteOl3) {
            deps = [{
                name : "ol",
                amd : "ol",
                cjs : "ol",
                global : "ol",
                param : "ol"
            }];
        } else if (isExecuteLeaflet) {
            deps = [{
                name : "leaflet",
                amd : "leaflet",
                cjs : "leaflet",
                global : "L",
                param : "leaflet"
            }];
        } else if (isExecuteVg) {
            // FIXME VirtualGeo est global en mode browser uniquement !
            // Pas de mode AMD...
            // deps = [{name :"vg", amd :"vg", cjs :"vg", global :"VirtualGeo", param :"vg"}];
            $.util.log("Nothing to do in VG mode");
        } else if (isExecuteITowns) {
            $.util.log("Nothing to do in iTowns mode");
        } else {
            $.util.log("Exception !");
        }

        return gulp.src(path.join(srcdir, getDistFileName()))
            .pipe(umd({
                /** exports function */
                exports : function (file) {
                    return "Gp" ;
                },
                /** namespace function */
                namespace : function (file) {
                    return "Gp" ;
                },
                /** dependencies function */
                dependencies : function (file) {
                    return deps || [];
                }
            }))
            .pipe(gulp.dest(builddir))
            .pipe($.plumber())
            .pipe($.size());
    });

    gulp.task("umd-mix", ["requirejs-amdclean-mix"], function () {

        var umd = require("gulp-umd");

        var builddir = path.join(_build, getDistDirName(), "umd");
        var srcdir   = path.join(_build, getDistDirName(), "js");
        var deps     = null;

        if (isExecuteOl3WithVg || isExecuteOl3WithITowns) {
            deps = [{
                name : "ol",
                amd : "ol",
                cjs : "ol",
                global : "ol",
                param : "ol"
            }];
        } else if (isExecuteLeafletWithVg || isExecuteLeafletWithITowns) {
            deps = [{
                name : "leaflet",
                amd : "leaflet",
                cjs : "leaflet",
                global : "L",
                param : "leaflet"
            }];
        } else {
            $.util.log("Exception !");
        }

        return gulp.src(path.join(srcdir, getDistFileName()))
            .pipe(umd({
                /** exports function */
                exports : function (file) {
                    return "Gp" ;
                },
                /** namespace function */
                namespace : function (file) {
                    return "Gp" ;
                },
                /** dependencies function */
                dependencies : function (file) {
                    return deps || [];
                }
            }))
            .pipe(gulp.dest(builddir))
            .pipe($.plumber())
            .pipe($.size());
    });

    // **~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    //  ✓ copy images
    //  > https://github.com/hparra/gulp-rename
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
    gulp.task("res-images", function () {

        var rename = require("gulp-rename");

        var builddir  = path.join(_build, getDistDirName(), "dist", getDistDirName().toLowerCase(),"img");
        var srcdir    = [];
        srcdir.push(path.join(_dir.res, getDistDirName(), "**", "*.png"));
        var commondir = path.join(_dir.res, "Common", "**", "*.gif");
        srcdir.push(commondir);

        if (isExecuteOl3) {
            // format SVG !
            srcdir.push(path.join(_dir.res, getDistDirName(), "**", "*.svg"));
        } else if (isExecuteLeaflet) {
            var plugindir = path.join("node_modules/leaflet-draw/dist/" , "images", "*.png");
            srcdir.push(plugindir);
        } else if (isExecuteVg) {
            $.util.log("Nothing to do in Vg mode");
        } else if (isExecuteITowns) {
            $.util.log("Nothing to do in iTowns mode");
        } else {
            $.util.log("Exception !");
        }

        return gulp.src(srcdir)
            .pipe(rename({
                dirname : ""
            }))
            .pipe(gulp.dest(builddir))
            .pipe($.plumber())
            .pipe($.size());

    });

    gulp.task("copy-images-mix", function () {

        var rename = require("gulp-rename");

        var builddir  = path.join(_build, getDistDirName(), "dist", getDistDirName().toLowerCase(), "img");
        var srcdir    = [];

        if (isExecuteOl3WithVg) {
            srcdir.push(path.join(_build, "Ol3", "dist", "ol3", "img", "*.*"));
            srcdir.push(path.join(_build, "Vg", "dist", "vg", "img", "*.*"));
        } else if (isExecuteOl3WithITowns) {
            srcdir.push(path.join(_build, "Ol3", "dist", "ol3", "img", "*.*"));
            srcdir.push(path.join(_build, "ITowns", "dist", "itowns", "img", "*.*"));
        } else if (isExecuteLeafletWithVg) {
            srcdir.push(path.join(_build, "Leaflet", "dist", "leaflet", "img", "*.*"));
            srcdir.push(path.join(_build, "Vg", "dist", "vg", "img", "*.*"));
        } else if (isExecuteLeafletWithITowns) {
            srcdir.push(path.join(_build, "Leaflet", "dist", "leaflet", "img", "*.*"));
            srcdir.push(path.join(_build, "ITowns", "dist", "itowns", "img", "*.*"));
        }

        return gulp.src(srcdir)
            .pipe(rename({
                dirname : ""
            }))
            .pipe(gulp.dest(builddir))
            .pipe($.plumber())
            .pipe($.size());

    });

    // **~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    //  ✓ compress images
    //  FIXME : tache desactivee (pb de build selon environnement)
    //  > https://github.com/sindresorhus/gulp-imagemin
    //  > https://github.com/imagemin/imagemin-optipng
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
    gulp.task("images", ["res-images"], function () {

        var imagemin = require("gulp-imagemin");
        var pngquant = require("imagemin-pngquant");

        var builddir = path.join(_build, getDistDirName(), "dist", getDistDirName().toLowerCase());
        var srcdir   = path.join(_build, getDistDirName(), "**", "*.png");

        return gulp.src(srcdir)
            .pipe(imagemin({
                progressive : true,
                svgoPlugins : [{
                    removeViewBox : false
                }],
                use : [pngquant()]
            }))
            .pipe(gulp.dest(builddir))
            .pipe($.plumber())
            .pipe($.size());
    });

    // **~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    //  ✓ minify css with clean-css
    //  > https://www.npmjs.com/package/gulp-minify-css
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
    gulp.task("res-styles", function () {

        var cleanCSS = require("gulp-clean-css");
        var concat    = require("gulp-concat");

        var builddir = path.join(_build, getDistDirName(), "dist", getDistDirName().toLowerCase());
        var srcdir   = path.join(_dir.res, getDistDirName(), "**", "*.css");
        var plugindir = null;
        var exceptsrcdir = "!" + path.join(_dir.res, getDistDirName(), "**", "__*.css");
        var srcdircommon = path.join(_dir.res, "Common", "*.css");
        var exceptsrcdircommon = "!" + path.join(_dir.res, "Common", "__*.css");
        var output = getBaseFileName();

        if (isExecuteOl3) {
            $.util.log("Nohing to do in Ol3 mode");
        } else if (isExecuteLeaflet) {
            // Plugins Leaflet !
            plugindir = path.join("node_modules/leaflet-draw/dist/", "leaflet.draw-src.css");
        } else if (isExecuteVg) {
            $.util.log("Nohing to do in Vg mode");
        } else if (isExecuteITowns) {
            $.util.log("Nohing to do in iTowns mode");
        } else {
            $.util.log("Exception !");
        }

        var srcArray =  [] ;
        if (srcdircommon) {
            srcArray.push(srcdircommon) ;
        }
        if (srcdir) {
            srcArray.push(srcdir) ;
        }
        if (plugindir) {
            srcArray.push(plugindir) ;
        }
        if (exceptsrcdir) {
            srcArray.push(exceptsrcdir) ;
        }
        if (exceptsrcdircommon) {
            srcArray.push(exceptsrcdircommon) ;
        }
        // return gulp.src([srcdircommon, srcdir, plugindir, exceptsrcdir, exceptsrcdircommon])
        return gulp.src(srcArray)
            .pipe((isProduction) ? cleanCSS({
                rebase : false,
                level : 2
            }) : $.util.noop())
            .pipe((isProduction) ? concat(output + ".css") : concat(output + "-src.css"))
            .pipe(gulp.dest(builddir))
            .pipe($.plumber())
            .pipe($.size());
    });

    gulp.task("copy-styles-mix", function () {

        var concat    = require("gulp-concat");

        var builddir = path.join(_build, getDistDirName(), "dist", getDistDirName().toLowerCase());
        var srcdir   = [];

        if (isExecuteOl3WithVg) {
            srcdir.push(path.join(_build, "Ol3", "dist", "ol3", "*.css"));
            srcdir.push(path.join(_build, "Vg", "dist", "vg", "*.css"));
        } else if (isExecuteOl3WithITowns) {
            srcdir.push(path.join(_build, "Ol3", "dist", "ol3", "*.css"));
            srcdir.push(path.join(_build, "ITowns", "dist", "itowns", "*.css"));
        } else if (isExecuteLeafletWithVg) {
            srcdir.push(path.join(_build, "Leaflet", "dist", "leaflet", "*.css"));
            srcdir.push(path.join(_build, "Vg", "dist", "vg", "*.css"));
        } else if (isExecuteLeafletWithITowns) {
            srcdir.push(path.join(_build, "Leaflet", "dist", "leaflet", "*.css"));
            srcdir.push(path.join(_build, "ITowns", "dist", "itowns", "*.css"));
        }

        var output = getBaseFileName();

        return gulp.src(srcdir)
            .pipe((isProduction) ? concat(output + ".css") : concat(output + "-src.css"))
            .pipe(gulp.dest(builddir))
            .pipe($.plumber())
            .pipe($.size());
    });

    // **~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    //  ✓ licence-js
    //  > ajout d"une licence au bundle js
    //  > https://www.npmjs.com/package/gulp-header
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
    gulp.task("licence-js", function () {

        // pour information,
        // le fichier de licence peut être un template,
        // les balises en nottion ES6-style : ${date}
        var header  = require("gulp-header");
        var strip   = require("gulp-strip-comments");

        var builddir = path.join(_build, getDistDirName(), "dist", getDistDirName().toLowerCase());
        var srcdir   = path.join(_build, getDistDirName(), "dist", getDistDirName().toLowerCase());
        var brief = null ;
        var version = null ;

        if (isExecuteOl3) {
            version = npmConf.ol3ExtVersion ;
            brief = npmConf.ol3ExtName ;
        } else if (isExecuteLeaflet) {
            version = npmConf.leafletExtVersion ;
            brief = npmConf.leafletExtName ;
        } else if (isExecuteVg) {
            version = npmConf.vgExtVersion ;
            brief = npmConf.vgExtName ;
        } else if (isExecuteITowns) {
            $.util.log("Nothing to do in iTowns mode");
        } else {
            $.util.log("Exception !");
        }

        return gulp.src([path.join(srcdir, getDistFileName())])
                .pipe(strip({
                    safe : false
                })) // first remove old headers comments
                .pipe(header( (isExecuteLeaflet) ? fs.readFileSync(path.join("utils", "licence-proj4Leaflet.txt") , "utf8") : ""))
                .pipe(header( (isExecuteLeaflet) ? fs.readFileSync(path.join("utils", "licence-plugin-leaflet-draw.txt") , "utf8") : ""))
                .pipe(header(fs.readFileSync(path.join("utils", "licence-proj4js.txt"), "utf8")))
                .pipe(header(fs.readFileSync(path.join("utils", "licence-sortable.txt"), "utf8")))
                .pipe(header(fs.readFileSync(path.join("utils", "licence-es6promise.txt"), "utf8")))
                .pipe(header(fs.readFileSync(path.join("utils", "licence-template.txt"), "utf8"), {
                    date : buildDate,
                    version : version,
                    brief : brief
                }))
                .pipe(gulp.dest(builddir))
                .pipe($.plumber())
                .pipe($.size()) ;
    });

    // |**~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // | ✓ licence-css
    // | > ajout d"une licence au bundle css
    // | > https:// ww.npmjs.com/package/gulp-header
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
    gulp.task("licence-css", function () {

        //  pour information,
        //  le fichier de licence peut être un template,
        //  les balises en nottion ES6-style : ${date}
        var header  = require("gulp-header");

        var builddir = path.join(_build, getDistDirName(), "dist", getDistDirName().toLowerCase()) ;
        var srcdir   = path.join(_build, getDistDirName(), "dist", getDistDirName().toLowerCase()) ;
        var output   = (isProduction) ? getBaseFileName() +  ".css" : getBaseFileName() +  "-src.css";
        var brief = null ;
        var version = null ;

        if (isExecuteOl3) {
            version = npmConf.ol3ExtVersion ;
            brief = npmConf.ol3ExtName ;
        } else if (isExecuteLeaflet) {
            version = npmConf.leafletExtVersion ;
            brief = npmConf.leafletExtName ;
        } else if (isExecuteVg) {
            version = npmConf.vgExtVersion ;
            brief = npmConf.vgExtName ;
        } else if (isExecuteITowns) {
            $.util.log("Nothing to do in iTowns mode");
        } else {
            $.util.log("Exception !");
        }

        return gulp.src([path.join(srcdir, output)])
                .pipe(header(fs.readFileSync(path.join("utils", "licence-template.txt") , "utf8"), {
                    date : buildDate,
                    version : version,
                    brief : brief
                }))
                .pipe(gulp.dest(builddir))
                .pipe($.plumber())
                .pipe($.size()) ;
    });

    // **~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    //  ✓ copy-libjsdoc
    //  > copie du template jaguarjs-jsdoc
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
    gulp.task("copy-libjsdoc", function () {

        var builddir = path.join(_build, getDistDirName(), "doc");

        return gulp.src(path.join(_dir.doc, "**"))
                .pipe(gulp.dest(builddir))
                .pipe($.plumber())
                .pipe($.size());
    });

    // **~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    //  ✓ copy-tutojsdoc
    //  > copie du template jaguarjs-jsdoc
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
    gulp.task("copy-tutojsdoc", function () {

        var builddir = path.join(_build, getDistDirName(), "doc", "tutorials");

        var tmpl = require("gulp-template");

        // FIXME copie uniquement des tuto du framework !
        return gulp.src(path.join(_dir.doc, "tutorials", "*.md"))
                .pipe(tmpl({
                    mode : (isProduction) ? "" : "-src"
                }))
                .pipe(gulp.dest(builddir))
                .pipe($.plumber())
                .pipe($.size());
    });

    // **~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    //  ✓ jsdoc
    //  > Documenting JavaScript with JSDoc.
    //  > http://usejsdoc.org
    //  > FIXME trouver un plugin capable de realiser la même chose que jsdoc-cli
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
    gulp.task("jsdoc", function () {

        var configfile = "jsdoc-" + getDistDirName().toLowerCase() + ".json";
        var jsdoc = ["node_modules", ".bin", "jsdoc"].join(path.sep);
        $.shelljs.exec(jsdoc + " -c " + configfile);

        // cf. https:// ww.npmjs.com/package/gulp-jsdoc3
        // var jsdoc = require("gulp-jsdoc3");
        //
        // // liste des sources
        // var src = [];
        // src.push(_src.js.lib);
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
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
    gulp.task("copy-dist", function () {

        var filename = getDistFileName();
        var basedir  = getDistDirName();
        var srcdir   = basedir.toLowerCase();
        var src      = path.join(_build, basedir, "umd", filename);

        return gulp.src(src)
            .pipe(gulp.dest(path.join(_build, basedir, "dist", srcdir))) ;
    });

    // |**~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // | ✓ lib-external
    // | > copie des lib externes leaflet ou ol3 dans lib/
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
    gulp.task("lib-external", function () {

        var basedir  = getDistDirName().toLowerCase();
        var builddir = path.join(_build, getDistDirName(), "lib", basedir);
        var srcdir   = path.join(_dir.lib, basedir, "**", "*.*");

        return gulp.src(srcdir)
            .pipe(gulp.dest(builddir)) ;
    });

    // |**~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // | ✓ copy-sample
    // | > copie des exemples leaflet ou ol3 dans samples/
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
    gulp.task("copy-sample", function () {

        var bundle   = getBaseFileName();
        var basedir  = getDistDirName().toLowerCase();
        var builddir = path.join(_build, getDistDirName(), "samples", basedir);

        var sources  = [];
        // includes : les bundles
        sources.push(path.join(_dir.samples, basedir, "**", "bundle*.html"));
        sources.push(path.join(_dir.samples, basedir, "**", "index-bundle*.html"));
        // excludes : les tests (amd)
        sources.push("!" + path.join(_dir.samples, basedir, "Test"));
        sources.push("!" + path.join(_dir.samples, basedir, "Test", "**"));

        var bundleToReplace  = bundle + "-src";

        return gulp.src(sources)
            .pipe((isProduction) ? $.replace(bundleToReplace, bundle) : $.util.noop())
            .pipe((isProduction) ? $.replace(bundleToReplace, bundle) : $.util.noop())
            .pipe(gulp.dest(builddir));
    });

    // |**~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // | ✓ copy-resources-sample
    // | > copie des ressources des exemples leaflet ou ol3 dans samples/
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
    gulp.task("copy-resources-sample", function () {

        var basedir  = getDistDirName().toLowerCase();
        var builddir = path.join(_build, getDistDirName(), "samples", basedir, "resources");

        var sources  = [];
        // includes : les ressources
        sources.push(path.join(_dir.samples, basedir, "resources", "**"));

        return gulp.src(sources)
            .pipe(gulp.dest(builddir));
    });

    // |**~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // | ✓ template-sample
    // | > construction de la page principale des exemples leaflet ou ol3
    // | > https:// ww.npmjs.com/package/gulp-template
    // | > FIXME les dependances des exemples !
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
    gulp.task("template-sample", function () {

        var tmpl = require("gulp-template");
        var glob = require("glob");

        var basedir  = getDistDirName().toLowerCase();
        var builddir = path.join(_build, getDistDirName(), "samples");
        var sources  = path.join(/*_dir.samples, */ basedir, "**", "*");
        var index    = path.join(_dir.samples, "index-" + basedir + ".html");

        var lstSources = glob.sync(sources , {
            cwd : builddir,
            nodir : true
        });

        console.log(lstSources);

        return gulp.src(index)
            .pipe(tmpl({
                files : lstSources,
                mode : (isProduction) ? "" : "-src" // FIXME !
            }))
            .pipe(gulp.dest(path.join(builddir)));
    });

    // **~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    //  ✓ publish
    //  > copie du bundle pour distribution
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
    gulp.task("publish", function () {

        var srcdir = [];
        // mode mixte
        if (isMix) {
            srcdir.push(path.join(_build, "Mix", "dist", "**"));
        } else if (isExecuteOl3) {
            srcdir.push(path.join(_build, "Ol3", "dist", "**"));
        } else if (isExecuteLeaflet) {
            srcdir.push(path.join(_build, "Leaflet", "dist", "**"));
        } else if (isExecuteVg) {
            srcdir.push(path.join(_build, "Vg", "dist", "**"));
        } else if (isExecuteITowns) {
            $.util.log("Nothing to do in iTowns mode");
        }

        $.util.log(srcdir) ;

        return gulp.src(srcdir)
                .pipe(gulp.dest(_dir.dist))
                .pipe($.plumber())
                .pipe($.size()) ;
    });

    // **~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    //  ✓ connect
    //  > https://www.npmjs.com/package/gulp-connect
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
    gulp.task("connect", function () {

        $.connect.server({
            root : [path.join(_build, getDistDirName()), "."],
            port : 9000,
            livereload : false
        });
    });

    // **~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    //  ✓ open
    //  > https://www.npmjs.com/package/open
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
    gulp.task("server", ["connect"], function () {

        var open = require("open");
        open("http://localhost:9000/samples/" + "index-" + getDistDirName().toLowerCase() + ".html");
    });

    // **~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    //  ✓ clean
    //  > nettoyage
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
    gulp.task("clean", [], function () {

        var stream = gulp.src([
            _build
        ], {
            force : true
        });
        return stream.pipe($.clean());
    });

    // **~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    //  ✓ clean
    //  > nettoyage brutal
    //  > https://github.com/robrich/gulp-rimraf
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
    gulp.task("clean-rimraf", [], function (cb) {
        var rimraf = require("rimraf");
        rimraf(_build, cb);
    });

    // **~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    //  ✓ tâche = alias
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
    gulp.task("test",    ["mocha-phantomjs"]);          // raccourci !
    gulp.task("check",   ["jshint", "jscs"]);           // raccourci !
    gulp.task("res",     ["res-styles", "res-images"]); // raccourci !
    gulp.task("licence", ["licence-css", "licence-js"]);// raccourci !
    gulp.task("lib",     ["lib-external"]);             // raccourci !
    gulp.task("dist",    ["task-dist"]);       //  tache sync. !
    gulp.task("doc",     ["task-doc"]);        //  tache sync. !
    gulp.task("sample",  ["task-sample"]);     //  tache sync. !

    // **~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    //  ✓ synchronisation des tâches
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
    var runSequence = require("run-sequence");

    gulp.task("build", function (cb) {

        var target = [];

        target.push("info");

        if (isExecuteOl3) {
            target.push("build-ol3");
        }

        if (isExecuteLeaflet) {
            target.push("build-leaflet");
        }

        if (isExecuteVg) {
            target.push("build-vg");
        }

        if (isExecuteITowns) {
            target.push("build-itowns");
        }

        // par defaut !
        if (target.length === 0) {
            target.push("build-ol3");
        }

        // gestion des flags mixtes
        isExecuteOl3WithVg = isMix && isExecuteOl3 && isExecuteVg;
        isExecuteLeafletWithVg = isMix && isExecuteLeaflet && isExecuteVg;
        isExecuteOl3WithITowns = isMix && isExecuteOl3 && isExecuteITowns;
        isExecuteLeafletWithITowns = isMix && isExecuteLeaflet && isExecuteITowns;

        if (isExecuteOl3WithVg) {
            target.push("build-ol3-vg");
        } else if (isExecuteLeafletWithVg) {
            $.util.log("[ERREUR] Execution des taches (mixte) entre Leaflet/VirtualGeo !!!");
        } else if (isExecuteOl3WithITowns) {
            $.util.log("[ERREUR] Execution des taches (mixte) entre OpenLayers/ITowns !!!");
        } else if (isExecuteLeafletWithITowns) {
            $.util.log("[ERREUR] Execution des taches (mixte) entre Leaflet/ITowns !!!");
        }

        // callback
        target.push(cb);

        runSequence.apply(this, target);

    });

    gulp.task("build-ol3", function (cb) {
        isExecuteOl3 = true;
        isExecuteLeaflet = !isExecuteOl3;
        isExecuteVg = !isExecuteOl3;
        isExecuteITowns = !isExecuteOl3;
        isExecuteOl3WithVg = isExecuteLeafletWithVg = isExecuteOl3WithITowns = isExecuteLeafletWithITowns = false;
        $.util.log("[INFO] Execution des taches pour OpenLayers...");
        runSequence("check", /*"test",*/ "dist", "doc", "lib", "sample", cb);
    });

    gulp.task("build-leaflet", function (cb) {
        isExecuteLeaflet = true;
        isExecuteOl3 = !isExecuteLeaflet;
        isExecuteVg = !isExecuteLeaflet;
        isExecuteITowns = !isExecuteLeaflet;
        isExecuteOl3WithVg = isExecuteLeafletWithVg = isExecuteOl3WithITowns = isExecuteLeafletWithITowns = false;
        $.util.log("[INFO] Execution des taches pour Leaflet...");
        runSequence("check", /*"test",*/ "dist", "doc", "lib", "sample", cb);
    });

    gulp.task("build-vg", function (cb) {
        isExecuteVg = true;
        isExecuteOl3 = !isExecuteVg;
        isExecuteLeaflet = !isExecuteVg;
        isExecuteITowns = !isExecuteVg;
        isExecuteOl3WithVg = isExecuteLeafletWithVg = isExecuteOl3WithITowns = isExecuteLeafletWithITowns = false;
        $.util.log("[INFO] Execution des taches pour VirtualGeo 3D...");
        runSequence(/*"check",*/ /*"test",*/ "dist", /*"doc",*/ "lib", "sample", cb);
    });

    gulp.task("build-itowns", function (cb) {
        isExecuteITowns = true;
        isExecuteOl3 = !isExecuteITowns;
        isExecuteLeaflet = !isExecuteITowns;
        isExecuteVg = !isExecuteITowns;
        isExecuteOl3WithVg = isExecuteLeafletWithVg = isExecuteOl3WithITowns = isExecuteLeafletWithITowns = false;
        $.util.log("[TODO] Execution des taches pour ITowns !!!");
        // runSequence("check", "test", "dist", "doc", "lib", "sample", cb);
    });

    gulp.task("build-ol3-vg", function (cb) {
        $.util.log("[INFO] Execution des taches (mixte) : OpenLayers/VirtualGeo !!!");
        isExecuteOl3WithVg = true;
        isExecuteLeafletWithVg = isExecuteOl3WithITowns = isExecuteLeafletWithITowns = false;
        runSequence(
            "clean-logger-mix",
            "umd-mix",
            "copy-dist",
            "copy-images-mix",
            "copy-styles-mix",
            cb);
    });

    gulp.task("task-dist", function (cb) {
        runSequence("source-js", "source-common", "clean-logger", "umd", "copy-dist", "res", "licence", cb);
    });

    gulp.task("task-doc", function (cb) {
        runSequence("copy-libjsdoc", "copy-tutojsdoc", "jsdoc", cb);
    });

    gulp.task("task-sample", function (cb) {
        runSequence("copy-sample", "copy-resources-sample", "template-sample", cb);
    });

    // **~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    //  ✓ tâche par default
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
    gulp.task("default", ["clean"], function () {
        gulp.start("build");
    });

}(require("gulp"), require("gulp-load-plugins")));
