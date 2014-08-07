var gulp = require('gulp');
var linterTask = require('./lint.js');

gulp.task('default', linterTask());
