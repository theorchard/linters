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
var gulpif = require('gulp-if');
var gutil = require('gulp-util');
var jsLint = require('gulp-jslint-simple');
var scssLint = require('gulp-scss-lint');
var cache = require('gulp-cached');
var watch = require('gulp-watch');

var reporter = require('./lib/reporter.js');
var config = {
    js: require('./config/js.js')(reporter.js),
    scss: 'config/scss.yml',
    watch: false,
    cache: false,
    cssFiles: ['**/*.scss', '!./node_modules/**/*.scss'],
    jsFiles: ['**/*.js', '!./gulpfile.js', '!./node_modules/**/*.js']
};


/**
 * Main task name.
 * @const
 */
var MAIN_TASK_NAME = 'linter:all';


/**
 * @param {Object} options The linters that needs to be disabled.
 */
module.exports = function (gulp, options) {
    options = options || {};
    config.disableJS = options.disableJS;
    config.disableScss = options.disableScss;


    /**
     * Task: JS Linter.
     *
     * Look for all the js file within a specific directory and run jslint on
     * them.
     */

    gulp.task('linter:js', function () {
        return gulp.src(config.jsFiles)
            .pipe(cache())
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
        return gulp.src(config.cssFiles)
            .pipe(cache())
            .pipe(scssLint({
                config: config.scss,
                customReport: reporter.scss
            }));
    });


    /**
     * Watcher: relaunch the tasks whenever a file is updated.
     */
    gulp.task('watch:all', function () {
        if (!config.disableScss) {
            gulp.watch(config.cssFiles, ['linter:scss']);
        }

        if (!config.disableJS) {
            gulp.watch(config.jsFiles, ['linter:js']);
        }
    });


    var tasks = [];
    if (!options.disableJS) {
        tasks.push('linter:js');
    }

    if (!options.disableScss) {
        tasks.push('linter:scss');
    }

    if (options.watch) {
        tasks.push('watch:all');
    }

    gulp.task(MAIN_TASK_NAME, tasks);
    return [MAIN_TASK_NAME];
};
