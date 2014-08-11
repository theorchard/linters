/**
 * Reporter.
 *
 * Linters are returning errors that are containing a line, a column,
 * and a message. The reporter has for objective to turn those errors into
 * readable messages.
 *
 * The interface offers two adaptors:
 * - js: for the gulp-jslint-simple.
 * - scss: for the gulp-scss-lint
 *
 * @author Michael Ortali <mortali@theorchard.com>
 */

'use strict';

var chalk = require('chalk');
var gutil = require('gulp-util');
var logSymbols = require('log-symbols');
var table = require('text-table');


/**
 * Reporter.
 *
 * The report method is displaying nicely all the information coming
 * from all the different reports.
 *
 * @param {String} path The path of the file.
 * @param {Boolean} pass If the linting was successful.
 * @param {Array} errors List of all the errors.
 * @param {String} name The name of the linter.
 */
var reporter = function (path, pass, errors, name) {
    if (pass) {
        gutil.log(logSymbols.success + ' ' + chalk.green(path));
    } else if (errors) {
        var _errors = [];
        var i;
        var error;
        for (i = 0; i < errors.length; i++) {
            error = errors[i];
            if (error) {
                _errors.push(['   ', 'line', error.line || 0, 'col',
                    (error.character || error.column || 0),
                    chalk.cyan(error.reason || 'Unknown')]);
            }
        }

        var ret = [
            '[' + chalk.gray(name) + '] ' + chalk.underline(chalk.red(path)),
            logSymbols.error +
                ' ' +
                _errors.length +
                ' issue' +
                (_errors.length === 1 ? '' : 's') +
                ' found:',
            table(_errors)
        ].join('\n');

        gutil.log('\n' + ret + '\n');
    }
};


/**
 * Javascript Reporter: Adaptor for the `gulp-jslint-simple` gulp plugin.
 *
 * @param {Array} results The result for a specific file.
 */
var jsReporter = function (name) {
    return function (results) {
        var file = results[0].file;
        var errors = [];

        results.map(function forEachResult(result) {
            errors.push(result.error);
        });
        reporter(file, false, errors, name);
    };
};


/**
 * SCSS Reporter: Adaptor for the `gulp-scss-lint`
 *
 * @param {File} file The file object.
 */
var scssReporter = function (file) {
    reporter(file.path, file.scsslint.success, file.scsslint.issues);
};


module.exports = {
    js: jsReporter,
    scss: scssReporter
};
