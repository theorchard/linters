/**
 * Orchard Linters.
 *
 * This gulp plugin verifies that the code is following our styleguides
 * and warns when it isn't. It allows us to quickly catch issues such as
 * tabs instead of spaces, missing comments, errors etc.
 *
 * Calling the linters is really simple:
 *
 *     ```
 *     var gulp = require('gulp');
 *     var linters = require('orchard-linters');
 *     linters.register(gulp, {
 *         scssFiles: ['!scssFilesToNotInclude.scss'],
 *         jsFiles: ['!jsFilesToNotInclude.js']
 *     });
 *     gulp.task('default', linters.all);
 *     ```
 *
 * Depending on which environment you're working from, you may want to either
 * just start a watcher, or lint one time your entire codebase.
 *
 *     * `all`: Lint all the files, for all formats.
 *     * `scss`:  Lint only scss files.
 *     * `js`: Lint only js files.
 *     * `watch`: Launch the watcher which runs whenever one file (scss, js)
 *            is updated. If you want the watcher to only execute for a specific
 *            file format, specify the options `disableJs` or `disableScss`.
 *     * `dev`: Launch the linter, and attach the watcher.
 *
 * @author Michael Ortali <mortali@theorchard.com>
 */

'use strict';

var gulp = require('gulp');
var gulpif = require('gulp-if');
var gutil = require('gulp-util');
var jsHint = require('gulp-jshint');
var jsLint = require('gulp-jslint-simple');
var scssLint = require('gulp-scss-lint');
var cache = require('gulp-cached');
var watch = require('gulp-watch');

var reporter = require('./lib/reporter.js');

/**
 * Configuration of the plugin.
 */
var config = {
    jshint: __dirname + '/config/jshint.js',
    jslint: require('./config/jslint.js'),
    scss: __dirname + '/config/scss.yml',
    watch: false,
    cache: false,

    // Look for all the .scss files except the ones in node_modules.
    scssFiles: ['**/*.scss', '!./node_modules/**/*.scss'],

    // Look for all the .scss files except the ones in node_modules and the
    // gulpfile.js
    jsFiles: ['**/*.js', '!./gulpfile.js', '!./node_modules/**/*.js']
};


/**
 * Register the tasks on the existing Gulp process.
 *
 * @param {Gulp} gulp The current gulp process.
 * @param {Object} options The options for the linters.
 */
var register = function (gulp, options) {
    options = options || {};
    config.disableJS = options.disableJS;
    config.disableScss = options.disableScss;
    config.scssFiles = config.scssFiles.concat(options.scssFiles || []);
    config.jsFiles = config.jsFiles.concat(options.jsFiles || []);

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
            }))
            .pipe(jsHint(config.js))
            .pipe(jsHint.reporter(reporter.js));
    });


    /**
     * Task: SCSS Linter.
     *
     * Look for all the scss files within a specific directory and run scss linter
     * on them.
     */
    gulp.task('linter:scss', function () {
        return gulp.src(config.scssFiles)
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
};


module.exports = {
    register: register,
    all: ['linter:scss', 'linter:js'],
    dev: ['linter:scss', 'linter:js', 'watch:all'],
    js: ['linter:js'],
    scss: ['linter:scss'],
    watch: ['watch:all']
};
