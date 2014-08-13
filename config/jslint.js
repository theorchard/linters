/**
 * JS Lint Configuration
 *
 * This configuration files dictate what JSLint should look for when it runs
 * an analysis of the code. All the options are documented in the main website:
 * http://www.jslint.com/lint.html.
 */

'use strict';

var config = {
    'bitwise': true,
    'browser': true,
    'debug': true,
    'esnext': false,
    'evil': false,
    'indent': 4,
    'maxlen': 80,
    'newcap': true,
    'node': true,
    'nomen': true,
    'passfail': false,
    'plusplus': true,
    'proto': false,
    'sub': true,
    'unused': true,
    'vars': false,
    'white': false,

    // Custom Globals
    'globals' : {
        'console': true,
        'jQuery': true,
        'require': true
    }
};

module.exports = config;
