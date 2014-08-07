var chalk = require('chalk');
var table = require('text-table');
var logSymbols = require('log-symbols');


var reporter = function(evt) {
    if (evt.pass) {
        console.log(logSymbols.success + ' ' + evt.file.green);
        return;
    }

    if (evt.errors) {
        var errors = [];
        for (var i=0; i < evt.errors.length; i++) {
            var error = evt.errors[i];
            if (error) {
                errors.push([
                    '   ',
                    'line',
                    error.line,
                    'char',
                    error.character,
                    chalk.cyan(error.reason)]);
            }
        }

        ret = [
            chalk.underline(evt.file.red),
            logSymbols.error + ' ' + errors.length + ' problem' + (errors.length === 1 ? '' : 's') + ':',
            table(errors)
        ].join('\n');
        console.log('\n' + ret + '\n');
    }
}

module.exports = reporter;
