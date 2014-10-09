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
 *         files: {
 *             scss: ['scssFilesToInclude.scss'],
 *             js: ['jsFilesToInclude.js']
 *         }
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
 *     * `py`: Lint only python files
 *     * `watch`: Launch the watcher which runs whenever one file (scss, js)
 *            is updated. If you want the watcher to only execute for a specific
 *            file format, specify the options `disableJs` or `disableScss`.
 *     * `dev`: Launch the linter, and attach the watcher.
 *
 * @author Michael Ortali <mortali@theorchard.com>
 */

'use strict';

var reporter = require('./lib/reporter.js');

var cache = require('gulp-cached');
var extend = require('node.extend');
var shell = require('gulp-shell');
var jsCs = require('gulp-jscs');
var jsHint = require('gulp-jshint');
var scssLint = require('gulp-scss-lint');


/**
 * Configuration of the plugin.
 */
var config = {
    jsHint: require('./config/jshint.js'),
    jsCs: require('./config/jscs.js'),
    scss: __dirname + '/config/scss.yml',
    watch: false,
    cache: false,

    // Look for all the .scss files except the ones in node_modules.
    files: {
        js: [],
        php: [],
        py: [],
        scss: []
    }
};


/**
 * Register the tasks on the existing Gulp process.
 *
 * @param {Gulp} gulp The current gulp process.
 * @param {Object} options The options for the linters.
 */
var register = function (gulp, options) {
    options = options || {};
    config.files = extend(config.files, options.files);

    config.disableJS = options.disableJS;
    config.disableScss = options.disableScss;
    config.disablePhp = options.disablePhp;

    /**
     * Task: JS Linter.
     *
     * Look for all the js file within a specific directory and run jslint on
     * them.
     */
    gulp.task('linter:js', function () {
        return gulp.src(config.files.js)
            .pipe(cache())

            // JS Hint
            .pipe(jsHint(config.jsHint))
            .pipe(jsHint.reporter(reporter.js('jsHint')))

            // JS CS
            .pipe(jsCs(config.jsCs));
    });


    /**
     * Task: SCSS Linter.
     *
     * Look for all the scss files within a specific directory and run scss
     * linter on them.
     */
    gulp.task('linter:scss', function () {
        return gulp.src(config.files.scss)
            .pipe(scssLint({
                config: config.scss,
                customReport: reporter.scss
            }));
    });


    /**
     * Task: Python linter.
     *
     * Look for all the python files within a specific directory and run the
     * pyflakes and pep8 against them.
     */
    gulp.task('linter:python', function () {
        var pylint = shell([
                'pyflakes <%= file.path %>',
                'pylint --rcfile=config/pylint <%= file.path %>'
            ],
            {quiet: true, ignoreErrors: true});

        return gulp.src(config.files.py, {read: false})
            .pipe(pylint)
            .on('data', reporter.py);
    });


    /**
     * Task: php linter (PHP_CodeSniffer)
     */
    gulp.task('linter:php', function() {
        var codeSniffer = shell(
            [__dirname + '/vendor/bin/phpcs --standard=PSR2 <%= file.path %>'],
            {quiet: true, ignoreErrors: true});

        return gulp.src(config.files.php, {read: false})
            .pipe(codeSniffer)
            .on('data', reporter.php);
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

        if (!config.disablePhp) {
            gulp.watch(config.phpFiles, ['linter:php']);
        }
    });
};


module.exports = {
    register: register,
    all: ['linter:scss', 'linter:js', 'linter:python', 'linter:php'],
    dev: [
        'linter:scss', 'linter:js', 'linter:python', 'linter:php',
        'watch:all'
    ],
    php: ['linter:php'],
    python: ['linter:python'],
    scss: ['linter:scss'],
    watch: ['watch:all']
};
