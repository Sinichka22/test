const gulp = require("gulp");
const babel = require("gulp-babel");
//const uglify = require('gulp-uglify');
const uglify = require("gulp-terser");
const cleanCSS = require("gulp-clean-css");
const htmlMin = require("gulp-htmlmin");
const replace = require("gulp-replace");

// Task to transpile and minify JavaScript
function minifyJS() {
	return gulp.src("./src/js/main.js").pipe(uglify()).pipe(gulp.dest("dist"));
}

// Task to minify CSS
function minifyCSS() {
	return gulp.src("./src/css/style.css").pipe(cleanCSS()).pipe(gulp.dest("dist"));
}

// Task to optimize HTML
function optimizeHTML() {
	return gulp
		.src("./src/index.html")
		.pipe(htmlMin({ collapseWhitespace: true }))
		.pipe(replace("main.css", "dist/main.css"))
		.pipe(replace("main.js", "dist/main.js"))
		.pipe(gulp.dest("dist"));
}

// Default task to run all tasks in sequence
gulp.task("default", gulp.series(minifyJS, minifyCSS, optimizeHTML));
