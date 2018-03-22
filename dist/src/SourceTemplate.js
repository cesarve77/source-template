'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _AutoForm = require('./AutoForm');

var _StyledComponets = require('./StyledComponets');

var _reactAce = require('react-ace');

var _reactAce2 = _interopRequireDefault(_reactAce);

require('brace/mode/javascript');

require('brace/theme/github');

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SourceTemplate = function (_Component) {
    _inherits(SourceTemplate, _Component);

    function SourceTemplate(props) {
        _classCallCheck(this, SourceTemplate);

        var _this = _possibleConstructorReturn(this, (SourceTemplate.__proto__ || Object.getPrototypeOf(SourceTemplate)).call(this, props));

        _this.state = { userData: _this.props.userData, template: _this.props.template, showForm: false, editTemplate: !_this.props.data };

        _this.getCode = function (data) {
            return (0, _utils.solveTemplate)(_this.state.template, data);
        };

        _this.onCopy = function () {
            _this.output = 'copy';
            _this.form.submit();
        };

        _this.onDownload = function () {
            _this.output = 'download';
            _this.form.submit();
        };

        _this.onSubmit = function (userData) {
            var onUserData = _this.props.onUserData;

            onUserData && onUserData(userData);
            return Promise.resolve(_this.getCode(userData));
        };

        _this.onSubmitSuccess = function (sourceCode) {
            if (_this.output === 'download') {
                var element = document.createElement('a');
                element.setAttribute('href', 'data:text/text;charset=utf-8,' + encodeURI((0, _utils.removeComments)(sourceCode)));
                element.setAttribute('download', _this.props.name);
                element.click();
            } else {
                (0, _utils.copyTextToClipboard)((0, _utils.removeComments)(sourceCode)).then(function () {
                    return console.log('copied');
                }).catch(function (err) {
                    return console.error(err);
                });
            }
            _this.hideForm();
        };

        _this.hideForm = function () {
            _this.setState({ showForm: false });
        };

        _this.autoForm = function () {
            var _this$state = _this.state,
                template = _this$state.template,
                userData = _this$state.userData;

            return _react2.default.createElement(
                _StyledComponets.Wrapper,
                { onCopy: _this.onCopy, onDownload: _this.onDownload, onClose: _this.hideForm },
                _react2.default.createElement(
                    _AutoForm.AutoForm,
                    {
                        ref: function ref(form) {
                            return _this.form = form;
                        },
                        schema: (0, _utils.getSchema)(template),
                        model: { userData: userData },
                        onSubmit: _this.onSubmit,
                        onSubmitSuccess: _this.onSubmitSuccess
                    },
                    _react2.default.createElement(_AutoForm.AutoFields, null),
                    _react2.default.createElement(_AutoForm.ErrorsField, null),
                    _react2.default.createElement('br', null)
                )
            );
        };

        _this.onChange = function (template, e) {
            _this.setState({ template: template });
            var onChange = _this.props.onChange;

            onChange && onChange(template, e);
        };

        _this.captureCopy = function (copied) {
            if (copied.length === _this.code.length) _this.showForm();
        };

        _this.showForm = function () {
            _this.setState({ showForm: true });
        };

        _this.code = _this.getCode(props.data);
        return _this;
    }

    _createClass(SourceTemplate, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            var userData = nextProps.userData;

            if (userData) {
                this.setState({ userData: userData });
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _state = this.state,
                template = _state.template,
                showForm = _state.showForm,
                editTemplate = _state.editTemplate;

            var _props = this.props,
                data = _props.data,
                props = _objectWithoutProperties(_props, ['data']);

            delete props.template;
            delete props.userData;
            return _react2.default.createElement(
                'div',
                { style: { height: props.height, width: props.width } },
                _react2.default.createElement(_reactAce2.default, _extends({
                    style: { display: '' + (!showForm && !editTemplate ? '' : 'none') },
                    onChange: this.onChange,
                    editorProps: { $blockScrolling: true }
                }, props, {
                    readOnly: true,
                    value: this.code,
                    onCopy: this.captureCopy
                })),
                _react2.default.createElement(_reactAce2.default, _extends({
                    style: { display: '' + (!showForm && editTemplate ? '' : 'none') },
                    onChange: this.onChange,
                    editorProps: { $blockScrolling: true }
                }, props, {
                    value: template
                })),
                _react2.default.createElement('br', null),
                !showForm && !editTemplate && _react2.default.createElement(
                    _StyledComponets.Button,
                    { onClick: function onClick() {
                            return _this2.setState({ editTemplate: true });
                        } },
                    'Edit template'
                ),
                !showForm && editTemplate && _react2.default.createElement(
                    _StyledComponets.Button,
                    { onClick: function onClick() {
                            return _this2.setState({ editTemplate: false });
                        } },
                    'Show code'
                ),
                !showForm && _react2.default.createElement(
                    _StyledComponets.Button,
                    { onClick: this.showForm },
                    'Get code'
                ),
                showForm && this.autoForm()
            );
        }
    }]);

    return SourceTemplate;
}(_react.Component);

SourceTemplate.defaultProps = {
    name: 'file.js',
    mode: "javascript",
    theme: "github",
    fontSize: 14,
    showPrintMargin: true,
    showGutter: true,
    highlightActiveLine: true,
    height: '500px',
    width: '100%'
};
SourceTemplate.propTypes = {
    template: _propTypes2.default.string.isRequired,
    data: _propTypes2.default.object,
    userData: _propTypes2.default.object

};
exports.default = SourceTemplate;
//# sourceMappingURL=SourceTemplate.js.map