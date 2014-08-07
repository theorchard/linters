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
var config = {
    js: require('./configs/js.js')
};

var gulp = require('gulp');
var gutil = require('gulp-util');
var jsLint = require('gulp-jslint-simple');
var plumber = require('gulp-plumber');
var reporter = require('./reporter.js');
var scssLint = require('gulp-scss-lint');

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
      .pipe(jsLint.run(config.js))
      .pipe(jsLint.report({
          reporter: reporter.js
      }));
};


O.cssLint = function() {
    return gulp.src(['*.scss'])
        .pipe(scssLint({
            config: 'configs/scss.yml',
            customReport: reporter.scss
        }));
};


gulp.task('js-lint', O.jsLint);
gulp.task('css-lint', O.cssLint);
gulp.task('default', ['js-lint', 'css-lint']);
