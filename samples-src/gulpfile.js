"use strict";

var path  = require("path");
var gulp  = require("gulp");
var clean = require("gulp-clean");
var hb    = require("gulp-hb");

var opts = require("minimist")(process.argv.slice(2));

var isExecuteOl3     = opts.ol3;
var isExecuteLeaflet = opts.leaflet;

var _dir = "";
if (isExecuteLeaflet) {
    _dir = "leaflet";
} else if (isExecuteOl3) {
    _dir = "ol3";
} else {
    // ...
}

gulp.task("build", ["copy-resources-samples"], function () {

    var hbStream = hb({
        cwd : process.cwd(),
        debug : true
    })
    .partials(path.join("templates", "partials", "*.hbs"))
    .partials(path.join("templates", "partials", _dir, "*.hbs"))
    .partials(path.join("templates", _dir, "*.hbs"))
    .helpers(require("handlebars-layouts"))
    .data("config.json");

    return gulp
        .src(path.join("pages", _dir, "**", "*.html"))
        .pipe(hbStream)
        .pipe(gulp.dest(path.join("build", _dir)));
});

gulp.task("copy-resources-samples", function () {

    var sources  = [];
    sources.push(path.join("resources", "**"));

    return gulp.src(sources)
        .pipe(gulp.dest(path.join("build", "resources")));
});

gulp.task("clean", [], function () {
    var stream = gulp.src([
        "build"
    ], {
        force : true
    });
    return stream.pipe(clean());
});

gulp.task("default", ["clean"], function () {
  gulp.start("build");
});
