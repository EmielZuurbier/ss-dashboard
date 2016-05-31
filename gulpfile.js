var gulp = require('gulp');
var cleanCSS = require('gulp-clean-css');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var concatCss = require('gulp-concat-css');
var concat = require('gulp-concat');

gulp.task('lint', function () {
    return gulp.src('build/script/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('concat-css', function () {
  	return gulp.src('build/style/*.css')
    	.pipe(concatCss("style.css"))
    	.pipe(gulp.dest('public/style'));
});

gulp.task('minify-css', ['concat-css'], function () {
    return gulp.src('public/style/style.css')
        .pipe(cleanCSS({debug: true}, function (details) {
            console.log(details.name + ': ' + details.stats.originalSize);
            console.log(details.name + ': ' + details.stats.minifiedSize);
        }))
        .pipe(gulp.dest('public/style'));
});

gulp.task('concat-js', function() {
  	return gulp.src('build/script/*.js')
    	.pipe(concat('all.js'))
    	.pipe(gulp.dest('./dist/'));
});

gulp.task('compress', function () {
    return gulp.src('build/script/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('public/script'));
});

gulp.task('optimize', function () {
    return gulp.src('build/media/images/*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest('public/media/images'));
});

gulp.task('watch', function () {
    gulp.watch('build/script/*.js', ['lint', 'compress']);
    gulp.watch('build/style/*.css', ['minify-css']);
    gulp.watch('build/media/images*', ['optimize']);
});

gulp.task('default', ['lint', 'concat-css', 'optimize', 'minify-css', 'compress', 'watch']);