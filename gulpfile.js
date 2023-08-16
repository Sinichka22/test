import gulp from "gulp";
import babel from "gulp-babel";
import uglify from "gulp-terser";
import cleanCSS from "gulp-clean-css";
import htmlMin from "gulp-htmlmin";
import replace from "gulp-replace";
import jsonMinify from 'gulp-json-minify';
import imagemin from "gulp-imagemin"; // Importing imagemin using ES module syntax

// Task to transpile and minify JavaScript
export function minifyJS() {
  return gulp.src("./src/js/*.js").pipe(uglify()).pipe(gulp.dest("dist/js"));
}

// Task to minify CSS
export function minifyCSS() {
  return gulp
    .src("./src/css/style.css")
    .pipe(cleanCSS())
    .pipe(gulp.dest("dist/css"));
}

// Task to optimize HTML
export function optimizeHTML() {
  return gulp
    .src("./src/index.html")
    .pipe(htmlMin({ collapseWhitespace: true }))
    .pipe(gulp.dest("dist"));
}

// Task to copy and minify fonts
export function minifyFonts() {
  return gulp.src("./src/fonts/*").pipe(gulp.dest("dist/fonts"));
}

// Task to copy and minify JSON files
export function minifyJSON() {
  return gulp
    .src("./src/json/*.json")
    .pipe(jsonMinify())
    .pipe(gulp.dest("dist/json"));
}

// Task to minimize images
export function minimizeImages() {
  return gulp.src("./src/img/*").pipe(imagemin()).pipe(gulp.dest("dist/img"));
}

// Default task to run all tasks in sequence
export default gulp.series(
  minifyJS,
  minifyCSS,
  optimizeHTML,
  minifyFonts,
  minifyJSON,
  minimizeImages
);