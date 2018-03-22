'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _AutoForm = require('./AutoForm');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by cesar on 21/3/18.
 */
var Warpper = void 0;
if (_AutoForm.style === 'semantic') {

    Warpper = function Warpper(_ref) {
        var children = _ref.children,
            onCopy = _ref.onCopy,
            onDownload = _ref.onDownload,
            onClose = _ref.onClose;

        return _react2.default.createElement(
            'div',
            null,
            children,
            _react2.default.createElement(
                'div',
                { className: 'actions' },
                _react2.default.createElement(
                    'div',
                    { className: 'ui button', onClick: onClose },
                    'Dismiss'
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'ui button', onClick: onCopy },
                    'Copy'
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'ui button', onClick: onDownload },
                    'Download'
                )
            )
        );
    };
}

if (_AutoForm.style === 'bootstrap3') {
    Warpper = function Warpper(_ref2) {
        var children = _ref2.children,
            onCopy = _ref2.onCopy,
            onDownload = _ref2.onDownload,
            onClose = _ref2.onClose;
        return _react2.default.createElement(
            'div',
            { className: 'modal fade', tabIndex: '-1', role: 'dialog' },
            _react2.default.createElement(
                'div',
                { className: 'modal-dialog', role: 'document' },
                _react2.default.createElement(
                    'div',
                    { className: 'modal-content' },
                    _react2.default.createElement(
                        'div',
                        { className: 'modal-header' },
                        _react2.default.createElement(
                            'button',
                            { onClick: onClose, type: 'button', className: 'close', 'data-dismiss': 'modal', 'aria-label': 'Close' },
                            _react2.default.createElement(
                                'span',
                                { 'aria-hidden': 'true' },
                                '\xD7'
                            )
                        ),
                        _react2.default.createElement(
                            'h4',
                            { className: 'modal-title' },
                            'Fill'
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'modal-body' },
                        _react2.default.createElement(
                            'p',
                            null,
                            'One fine body\u2026'
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'modal-footer' },
                        _react2.default.createElement(
                            'button',
                            { type: 'button', className: 'btn btn-default', onClick: onCopy },
                            'Copy'
                        ),
                        _react2.default.createElement(
                            'button',
                            { type: 'button', className: 'btn btn-default', onClick: onDownload },
                            'Download'
                        )
                    )
                )
            )
        );
    };
}
if (_AutoForm.style === 'bootstrap4') {
    Warpper = function Warpper(_ref3) {
        var children = _ref3.children,
            onCopy = _ref3.onCopy,
            onDownload = _ref3.onDownload,
            onClose = _ref3.onClose;
        return _react2.default.createElement(
            'div',
            { className: 'modal', tabIndex: '-1', role: 'dialog' },
            _react2.default.createElement(
                'div',
                { className: 'modal-dialog', role: 'document' },
                _react2.default.createElement(
                    'div',
                    { className: 'modal-content' },
                    _react2.default.createElement(
                        'div',
                        { className: 'modal-header' },
                        _react2.default.createElement(
                            'h5',
                            { className: 'modal-title' },
                            'Warpper title'
                        ),
                        _react2.default.createElement(
                            'button',
                            { onClick: onClose, type: 'button', className: 'close', 'data-dismiss': 'modal', 'aria-label': 'Close' },
                            _react2.default.createElement(
                                'span',
                                { 'aria-hidden': 'true' },
                                '\xD7'
                            )
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'modal-body' },
                        children
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'modal-footer' },
                        _react2.default.createElement(
                            'button',
                            { type: 'button', className: 'btn btn-default', onClick: onCopy },
                            'Copy'
                        ),
                        _react2.default.createElement(
                            'button',
                            { type: 'button', className: 'btn btn-default', onClick: onDownload },
                            'Download'
                        )
                    )
                )
            )
        );
    };
}

if (_AutoForm.style === 'material') {
    Warpper = function Warpper(_ref4) {
        var children = _ref4.children,
            onCopy = _ref4.onCopy,
            onDownload = _ref4.onDownload,
            onClose = _ref4.onClose;

        var actions = [_react2.default.createElement(FlatButton, {
            label: 'Cancel',
            primary: true,
            onClick: onCopy
        }), _react2.default.createElement(FlatButton, {
            label: 'Submit',
            primary: true,
            keyboardFocused: true,
            onClick: undefined.handleClose
        })];

        return _react2.default.createElement(
            Dialog,
            {
                title: 'Dialog With Actions',
                actions: actions,
                modal: true,
                open: true,
                onRequestClose: onDownload
            },
            children
        );
    };
}

exports.default = Warpper;
//# sourceMappingURL=StyledComponets.js.map