'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Button = exports.Wrapper = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _AutoForm = require('./AutoForm');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by cesar on 21/3/18.
 */
var Wrapper = exports.Wrapper = void 0,
    Button = exports.Button = void 0;

if (_AutoForm.style === 'semantic') {
    exports.Button = Button = function Button(_ref) {
        var children = _ref.children,
            onClick = _ref.onClick;
        return _react2.default.createElement(
            'button',
            { type: 'button', className: 'ui button', onClick: onClick },
            children
        );
    };
}

if (_AutoForm.style === 'bootstrap3') {
    exports.Button = Button = function Button(_ref2) {
        var children = _ref2.children,
            onClick = _ref2.onClick;
        return _react2.default.createElement(
            'button',
            { type: 'button', className: 'btn btn-default', onClick: onClick },
            children
        );
    };
}
if (_AutoForm.style === 'bootstrap4') {
    exports.Button = Button = function Button(_ref3) {
        var children = _ref3.children,
            onClick = _ref3.onClick;
        return _react2.default.createElement(
            'button',
            { type: 'button', className: 'btn btn-default', onClick: onClick },
            children
        );
    };
}

if (_AutoForm.style === 'material') {
    var FlatButton = require('material-ui').FlatButton;
    exports.Button = Button = function Button(_ref4) {
        var children = _ref4.children,
            onClick = _ref4.onClick;
        return _react2.default.createElement(FlatButton, { label: children, onClick: onClick });
    };
}

if (_AutoForm.style === 'antd') {
    exports.Button = Button = require('antd').Button;
}

exports.Wrapper = Wrapper = function Wrapper(_ref5) {
    var children = _ref5.children,
        onCopy = _ref5.onCopy,
        onDownload = _ref5.onDownload,
        onClose = _ref5.onClose;

    return _react2.default.createElement(
        'div',
        null,
        children,
        _react2.default.createElement(
            Button,
            { onClick: onClose },
            'Dismiss'
        ),
        _react2.default.createElement(
            Button,
            { onClick: onCopy },
            'Copy'
        ),
        _react2.default.createElement(
            Button,
            { onClick: onDownload },
            'Download'
        )
    );
};
//# sourceMappingURL=StyledComponets.js.map