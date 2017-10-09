var gulp  = require("gulp");
var clean = require("gulp-clean");
var hb    = require("gulp-hb");

gulp.task("build", [], function () {
    var hbStream = hb({
        cwd : process.cwd(),
        debug : true
    })
    .partials('./templates/partials/*.hbs')
    .partials('./templates/partials/leaflet/*.hbs')
    .partials('./templates/leaflet/*.hbs')
    .helpers(require('handlebars-layouts'))
    .data('./config.json');

    return gulp
        .src('./pages/leaflet/**/*.html')
        .pipe(hbStream)
        .pipe(gulp.dest('./build'));
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
