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
        var foundErrors = [];

        for (var i = 0; i < errors.length; i++) {
            var error = errors[i];
            if (error) {
                foundErrors.push([
                    '   ',
                    'line', error.line || 0,
                    'col', (error.character || error.column || 0),
                    chalk.cyan(error.reason || 'Unknown')
                ]);
            }
        }

        var ret = [
            '[' + chalk.gray(name) + '] ' + chalk.underline(chalk.red(path)),
            logSymbols.error +
                ' ' +
                foundErrors.length +
                ' issue' +
                (foundErrors.length === 1 ? '' : 's') +
                ' found:',
            table(foundErrors)
        ].join('\n');

        gutil.log('\n' + ret + '\n');
    }
};


/**
 * Javascript Reporter: Adaptor for the `gulp-jslint-simple` gulp plugin.
 *
 * @param {String} name The name of the linter.
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
 * Python reporter
 */
var pyReporter = function (file) {
    var errors = [];
    var LINTERS = {
        5: 'pep8',
        3: 'pyflakes'
    };
    var lines;
    var linter;

    if (file.error) {
        lines = file.stdout.split('\n');
        for (var i = 0; i < lines.length; i++) {
            var parts = lines[i].split(':');
            if (parts.length === 5) {
                linter = LINTERS[5];
                errors.push({
                    line: parts[1].trim(),
                    column: parts[2].trim(),
                    reason: parts[4].trim().split('\n')[0]
                });
            } else if (parts.length === 3) {
                linter = LINTERS[3];
                errors.push({
                    line: parts[1],
                    column: '',
                    reason: parts[2]
                });
            }
        }
    }

    reporter(file.path, !file.error, errors, linter);
};


/**
 * SCSS Reporter: Adaptor for the `gulp-scss-lint`
 *
 * @param {File} file The file object.
 */
var scssReporter = function (file) {
    reporter(file.path, file.scsslint.success, file.scsslint.issues, 'SCSS');
};


/**
 * PHP reporter.
 *
 * @param {File} file The file object.
 */
var phpReporter = function (file) {
    var content = file.stdout.split('\n');
    var errors = [];
    var parts;

    for (var i = 5; i < content.length - 1; i++) {
        parts = content[i].split('|');
        if (parts.length < 3) {
            continue;
        }

        errors.push({
            line: parts[0],
            reason: parts[2]
        });
    }

    reporter(file.path, !errors.length, errors, 'PHP CodeSniffer');
};


module.exports = {
    js: jsReporter,
    scss: scssReporter,
    py: pyReporter,
    php: phpReporter
};
