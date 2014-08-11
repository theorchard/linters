/**
 * JS Lint Configuration
 *
 * This configuration files dictate what JSLint should look for when it runs
 * an analysis of the code. All the options are documented in the main website:
 * http://www.jslint.com/lint.html.
 */

'use strict';

var config = {
    'asi': false,
    'bitwise': true,
    'boss': false,
    'browser': true,
    'camelcase': true,
    'curly': true,
    'debug': true,
    'eqeqeq': true,
    'eqnull': true,
    'errorsOnly': false,
    'es5': false,
    'esnext': false,
    'evil': false,
    'expr': false,
    'forin': true,
    'funcscope': true,
    'immed': true,
    'indent': 4,
    'iterator': false,
    'lastsemic': false,
    'latedef': true,
    'laxbreak': false,
    'laxcomma': false,
    'loopfunc': false,
    'maxcomplexity': 4,
    'maxdepth': 3,
    'maxlen': 80,
    'maxparams': false,
    'maxstatements': false,
    'moz': false,
    'multistr': false,
    'newcap': true,
    'noarg': true,
    'node': true,
    'noempty': true,
    'nomen': true,
    'nonew': true,
    'onevar': false,
    'passfail': false,
    'plusplus': false,
    'proto': false,
    'quotmark': 'single',
    'scripturl': false,
    'shadow': false,
    'smarttabs': false,
    'sub': true,
    'supernew': false,
    'trailing': true,
    'undef': true,
    'unused': true,
    'validthis': false,
    'white': false,
    'vars': true,

    // Custom Globals
    'globals' : {
        'console': true,
        'jQuery': true,
        'require': true
    }
};


module.exports = function (reporter) {
    config.reporter = reporter;
    return config;
};
