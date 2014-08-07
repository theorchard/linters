var gulp = require('gulp');
var linterTask = require('orchard-styleguides');

gulp.task('default', linterTask(gulp, {
    watch: true
}));
