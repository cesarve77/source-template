'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * Created by cesar on 21/3/18.
 */
var uniforms = void 0;
var _style = void 0;

try {

    uniforms = require('uniforms-semantic');
    _style = 'semantic';
} catch (e) {}
try {
    uniforms = require('uniforms-material');
    _style = 'material';
} catch (e) {}
try {
    uniforms = require('uniforms-bootstrap4');
    _style = 'bootstrap4';
} catch (e) {}
try {
    uniforms = require('uniforms-bootstrap3');
    _style = 'bootstrap3';
} catch (e) {}
try {
    uniforms = require('uniforms-antd');
    _style = 'antd';
} catch (e) {}

if (!uniforms) {
    console.error("Install one of this npm pacakage 'uniforms-antd' , 'uniforms-bootstrap3' , 'uniforms-bootstrap4' , 'uniforms-material' , 'uniforms-semantic'");
}
var style = exports.style = _style;
var AutoForm = exports.AutoForm = uniforms.AutoForm;
var ErrorsField = exports.ErrorsField = uniforms.ErrorsField;
var AutoFields = exports.AutoFields = uniforms.AutoFields;
var ListField = exports.ListField = uniforms.ListField;
//# sourceMappingURL=AutoForm.js.map