/**
 * Orchard StyleGuide.
 *
 * This gulp plugin verifies that the code is following our styleguides
 * and warns when it isn't. It allows us to quickly catch issues such as
 * tabs instead of spaces, missing comments, errors etc.
 *
 * @author Michael Ortali <mortali@theorchard.com>
 */

'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');
var jsLint = require('gulp-jslint-simple');
var scssLint = require('gulp-scss-lint');

var reporter = require('./lib/reporter.js');
var config = {
    js: require('./config/js.js')(reporter.js),
    scss: 'configs/scss.yml'
};


/**
 * Main task name.
 * @const
 */
var MAIN_TASK_NAME = 'linter:all';


/**
 * Task: JS Linter.
 *
 * Look for all the js file within a specific directory and run jslint on
 * them.
 */
gulp.task('linter:js', function () {
    return gulp.src([
        '**/*.js',
        '!./gulpfile.js',
        '!./node_modules/**'])
        .pipe(jsLint.run(config.js))
        .pipe(jsLint.report({
            reporter: reporter.js
        }));
});


/**
 * Task: SCSS Linter.
 *
 * Look for all the scss files within a specific directory and run scss linter
 * on them.
 */
gulp.task('linter:scss', function () {
    return gulp.src(['*.scss'])
        .pipe(scssLint({
            config: config.scss,
            customReport: reporter.scss
        }));
});


/**
 * @param {Object} options The linters that needs to be disabled.
 */
module.exports = function (options) {
    options = options || {};

    var tasks = [];

    if (!options.disableJS) {
        tasks.push('linter:js');
    }

    if (!options.disableScss) {
        tasks.push('linter:scss');
    }

    gulp.task(MAIN_TASK_NAME, tasks);
    return [MAIN_TASK_NAME];
};
