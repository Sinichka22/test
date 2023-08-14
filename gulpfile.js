const gulp = require("gulp");
const babel = require("gulp-babel");
//const uglify = require('gulp-uglify');
const uglify = require("gulp-terser");
const cleanCSS = require("gulp-clean-css");
const htmlMin = require("gulp-htmlmin");
const replace = require("gulp-replace");
const jsonMinify = require("gulp-jsonminify");

// Task to transpile and minify JavaScript
function minifyJS() {
	return gulp
	.src("./src/js/*.js")
	.pipe(uglify())
	.pipe(gulp.dest("dist/js"));
}

// Task to minify CSS
function minifyCSS() {
	return gulp
	.src("./src/css/style.css")
	.pipe(cleanCSS())
	.pipe(gulp.dest("dist/css"));
}

// Task to optimize HTML
function optimizeHTML() {
	return gulp
		.src("./src/index.html")
		.pipe(htmlMin({ collapseWhitespace: true }))
/*		.pipe(replace("style.css", "dist/css/style.css"))
		.pipe(replace("main.js", "dist/js/main.js"))
		.pipe(replace("vivus.js", "dist/js/vivus.js"))*/
		.pipe(gulp.dest("dist"));
}

// Task to copy and minify fonts
function minifyFonts() {
	return gulp
	.src("./src/fonts/*")
	.pipe(gulp.dest("dist/fonts"));
}

// Task to copy and minify JSON files
function minifyJSON() {
	return gulp.src("./src/json/*.json")
		.pipe(jsonMinify())
		.pipe(gulp.dest("dist/json"));
}

// Task to copy and minify node_modules (be cautious with this)
function minifyNodeModules() {
	return gulp
	.src("./node_modules/**/*")
	.pipe(gulp.dest("dist/node_modules"));
}

// Default task to run all tasks in sequence
gulp.task("default", gulp.series(minifyJS, minifyCSS, optimizeHTML, minifyFonts, minifyJSON, minifyNodeModules));

