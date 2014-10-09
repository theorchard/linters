/**
 * JS Hint Configuration
 *
 * This configuration files dictate what JSHint should look for when it runs
 * an analysis of the code. All the options are documented on github:
 * https://github.com/jshint/jshint/blob/master/examples/.jshintrc
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
    'maxcomplexity': false,
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

    // Custom Globals
    'globals' : {
        '$': false,
        '_': false,
        'Backbone': false,
        'console': true,
        'goog': false,
        'jQuery': true,
        'require': true
    }
};

module.exports = config;
