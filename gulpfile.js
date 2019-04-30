const gulp = require('gulp');
const less = require('gulp-less');
const cleanCss = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');


gulp.task('less', () => {
    gulp.src('./src/less/**/*.less')
        .pipe(less())
        .pipe(autoprefixer({
            browsers: ['last 10 versions']
        }))
        .pipe(cleanCss())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('./dist/css'));
});

gulp.task('js', () => {
    gulp.src('./src/js/**/*.js')
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(uglify())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('./dist/js'))
});

gulp.task('watch-less', () => gulp.watch('./src/less/**/*.less', gulp.series('less')));
gulp.task('watch-js', () => gulp.watch('./src/js/**/*.js', gulp.series('js')));

gulp.task('default', gulp.parallel('less', 'js', 'watch-less', 'watch-js'));