/**
 * JSCS Configuration
 *
 * This configuration files dictate what JSCS should look for when it runs
 * an analysis of the code. All the options are documented on github:
 * http://catatron.com/node-jscs/rules/.
 */

var config = {
    disallowDanglingUnderscores: true,
    disallowEmptyBlocks: true,
    disallowKeywords: ['width'],
    disallowKeywordsOnNewLine: ['else'],
    disallowMixedSpacesAndTabs: true,
    disallowMultipleLineStrings: true,
    disallowMultipleVarDecl: true,
    disallowSpaceAfterPrefixUnaryOperators: [
        '++',
        '--',
        '+',
        '-',
        '~',
        '!'
    ],
    requireSpacesInFunctionExpression: {
        beforeOpeningCurlyBrace: true
    },
    disallowSpacesInsideArrayBrackets: true,
    disallowSpacesInsideObjectBrackets: true,
    disallowSpacesInsideParentheses: true,
    disallowTrailingComma: true,
    disallowTrailingWhitespace: true,
    disallowYodaConditions: true,
    disallowPaddingNewlinesInBlocks: true,
    maximumLineLength: 80,
    validateIndentation: 4,
    requireBlocksOnNewline: true,
    requireCamelCaseOrUpperCaseIdentifiers: true,
    requireCapitalizedConstructors: true,
    requireCommaBeforeLineBreak: true,
    requireOperatorBeforeLineBreak: [
        '?',
        '+',
        '-',
        '/',
        '*',
        '=',
        '==',
        '===',
        '!=',
        '!==',
        '>',
        '>=',
        '<',
        '<='
    ],
    requireParenthesesAroundIIFE: true,
    requireSpaceAfterBinaryOperators: [
        '+',
        '-',
        '/',
        '*',
        '=',
        '==',
        '===',
        '!=',
        '!=='
    ],
    requireSpaceAfterKeywords: [
        'if',
        'else',
        'for',
        'while',
        'do',
        'switch',
        'return',
        'try',
        'catch'
    ],
    requireSpaceBeforeBinaryOperators: [
        '+',
        '-',
        '/',
        '*',
        '=',
        '==',
        '===',
        '!=',
        '!=='
    ],
    requireSpaceBeforeBlockStatements: true,
    requireSpacesInAnonymousFunctionExpression: {
        beforeOpeningCurlyBrace: true

    },
    safeContextKeyword: ['self'],
    validateJSDoc: {
        checkParamNames: true,
        requireParamTypes: true,
        checkRedundantParams: true
    },
    validateQuoteMarks: '\''
};


module.exports = config;
