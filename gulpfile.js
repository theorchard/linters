/**
 * Orchard StyleGuide.
 *
 *
 *
 * This gulp plugin verifies that the code is following our styleguides
 * and warns when it isn't. It allows us to quickly catch issues such as
 * tabs instead of spaces, missing comments, errors etc.
 *
 * @author Michael Ortali <mortali@theorchard.com>
 */

/** global require */

var gutil = require('gulp-util');
var jsLint = require('gulp-jslint');
var plumber = require('gulp-plumber');
var gulp = require('gulp');
var reporter = require('./reporter.js');
var jsLintConfig = require('./configs/js.js');

/**
 * @constructor
 */
var O = {};


/**
 * Javascript Linter.
 */
O.jsLint = function() {
    return gulp.src([
          '**/*.js',
          '!./gulpfile.js',
          '!./node_modules/**'])
      .pipe(plumber())
      .pipe(jsLint(jsLintConfig));
};


O.cssLint = function() {
    return gulp.src(['*/**.scss'])
        .pipe
};


gulp.task('js-lint', O.jsLint);
gulp.task('css-lint', O.cssLint);
gulp.task('default', ['js-lint']);
