var chalk = require('chalk');
var table = require('text-table');
var logSymbols = require('log-symbols');
var gutil = require('gulp-util');


var jsReporter = function(results) {
    var file = results[0].file;
    var errors = [];
    results.map(function(result) {
        errors.push(result.error);
    });
    reporter(file, false, errors);
}

var scssReporter = function(file) {
    reporter(file.path, file.scsslint.success, file.scsslint.issues);
}

var reporter = function(path, pass, errors) {
    if (pass) {
        gutil.log(logSymbols.success + ' ' + chalk.green(path));
        return;
    }

    if (errors) {
        var _errors = [];
        for (var i=0; i < errors.length; i++) {
            var error = errors[i];
            if (error) {
                _errors.push([
                    '   ',
                    'line',
                    error.line,
                    'col',
                    error.character || error.column,
                    chalk.cyan(error.reason)]);
            }
        }

        ret = [
            chalk.underline(chalk.red(path)),
            logSymbols.error + ' ' + _errors.length + ' issue' + (_errors.length === 1 ? '' : 's') + ' found:',
            table(_errors)
        ].join('\n');
        gutil.log('\n' + ret + '\n');
    }
}

module.exports = {
    js: jsReporter,
    scss: scssReporter
};
