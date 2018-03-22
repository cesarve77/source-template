'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.copyTextToClipboard = exports.getSchema = exports.solveTemplate = exports.removeComments = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /**
                                                                                                                                                                                                                                                                   * Created by cesar on 21/3/18.
                                                                                                                                                                                                                                                                   */


var _doctrine = require('doctrine');

var _doctrine2 = _interopRequireDefault(_doctrine);

var _simplSchema = require('simpl-schema');

var _simplSchema2 = _interopRequireDefault(_simplSchema);

var _handlebars = require('handlebars');

var _handlebars2 = _interopRequireDefault(_handlebars);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getOnlyComments = function getOnlyComments(template) {
    return template.match(/\/\*\*[\s\S]+?\*\//g) || [];
};
var removeComments = exports.removeComments = function removeComments(template) {
    return template.replace(/\/\*\*[\s\S]+?\*\/\n?/g, '');
};
var buildSchemaObjFromHandlebarAST = function buildSchemaObjFromHandlebarAST(program) {
    var prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

    var obj = {};
    if (prefix) prefix = prefix + '.';
    program.body.forEach(function (statement) {
        if (statement.type === 'MustacheStatement') {
            obj[prefix + statement.path.original] = { type: String };
        }
        if (statement.type === 'BlockStatement' && statement.path.original === 'each') {
            obj[prefix + statement.params[0].original] = { type: Array };
            obj[prefix + statement.params[0].original + '.$'] = { type: Object };
            obj = _extends({}, obj, buildSchemaObjFromHandlebarAST(statement.program, statement.params[0].original + '.$'));
        }
        if (statement.type === 'BlockStatement' && statement.path.original === 'if') {
            obj[prefix + statement.params[0].original] = Boolean;
        }
    });
    return obj;
};

var getType = function getType(type) {
    if (!type) return String;
    type = type.toLowerCase();
    switch (type) {
        case 'string':
            return String;

        case 'boolean':
            return Boolean;

        case 'number':
            return Number;

        case 'object':
            return Object;

        case 'array':
            return Array;
        default:
            return String;
    }
};
var improveSchemaObjFromDoctrine = function improveSchemaObjFromDoctrine(schemaObj, template) {
    var onlyComments = getOnlyComments(template);
    onlyComments.forEach(function (comment) {
        var ast = _doctrine2.default.parse(comment, {
            recoverable: true,
            sloppy: true,
            unwrap: true
        });
        ast.tags.forEach(function (tag) {
            var optional = tag.type.type === 'OptionalType';
            var name = tag.name.replace(/\[\]/gi, '.$');
            schemaObj[name].optional = optional;

            if (tag.type.type === 'UnionType') {
                var allowedValues = tag.type.elements.map(function (ele) {
                    return ele.value;
                });
                schemaObj[name].allowedValues = allowedValues;
                schemaObj[name].defaultValue = allowedValues[0];
            }
            var type = schemaObj[name].type;
            if (type !== Array) {
                type = getType(tag.type.name || tag.type.expression && tag.type.expression.name);
            } else {
                if (!optional) {
                    schemaObj[name].minCount = 1;
                }
            }
            schemaObj[name].type = type;
            schemaObj[name].label = tag.description;
        });
    });
};

var solveTemplate = exports.solveTemplate = function solveTemplate(template, data) {
    return _handlebars2.default.compile(template)(data);
};

var getSchema = exports.getSchema = function getSchema(template) {
    var ast = _handlebars2.default.parse(template);
    var schemaObj = buildSchemaObjFromHandlebarAST(ast);
    improveSchemaObjFromDoctrine(schemaObj, template);
    return new _simplSchema2.default(schemaObj);
};

var fallbackCopyTextToClipboard = function fallbackCopyTextToClipboard(text) {
    return new Promise(function (resolve, reject) {
        var textArea = document.createElement("textarea");
        textArea.value = text;
        textArea.style.height = '0';
        textArea.style.width = '0';
        textArea.style.position = 'absolute';
        textArea.style.top = '-100000px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        try {
            var successful = document.execCommand('copy');
            resolve();
        } catch (err) {
            reject(err);
        }
        document.body.removeChild(textArea);
    });
};
var copyTextToClipboard = exports.copyTextToClipboard = function copyTextToClipboard(text) {
    if (!navigator.clipboard) {
        return fallbackCopyTextToClipboard(text);
    }
    return navigator.clipboard.writeText(text);
};
//# sourceMappingURL=utils.js.map