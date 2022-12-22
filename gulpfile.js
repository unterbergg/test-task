const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const del = require('del');
const autoprefixer = require('gulp-autoprefixer');
const cssnano = require('gulp-cssnano');
const plumber = require('gulp-plumber');
const minify = require('gulp-minify-css');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');

gulp.task('styles', () => {
    return gulp.src('src/scss/**/*.scss')
        .pipe(plumber(true))
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer(['last 15 version', '> 1%', 'ie 8', 'ie 7'], {
            cascade: true
        }))
        .pipe(cssnano())
        .pipe(minify())
        .pipe(plumber.stop())
        .pipe(gulp.dest('./css/'));
});

gulp.task('clean', () => {
    return del([
        'css/main.css'
    ]);
});

gulp.task('default', gulp.series(['clean', 'styles']));

gulp.task('watch', () => {
    gulp.watch('src/scss/**/*.scss', (done) => {
        gulp.series(['clean', 'styles'])(done);
    });
});
