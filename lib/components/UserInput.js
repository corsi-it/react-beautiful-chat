'use strict';

exports.__esModule = true;

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _SendIcon = require('./icons/SendIcon');

var _SendIcon2 = _interopRequireDefault(_SendIcon);

var _EmojiIcon = require('./icons/EmojiIcon');

var _EmojiIcon2 = _interopRequireDefault(_EmojiIcon);

var _FileIcon = require('./icons/FileIcon');

var _FileIcon2 = _interopRequireDefault(_FileIcon);

var _close = require('../assets/close.svg');

var _close2 = _interopRequireDefault(_close);

var _file = require('../assets/file.svg');

var _file2 = _interopRequireDefault(_file);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var UserInput = function (_Component) {
  _inherits(UserInput, _Component);

  function UserInput() {
    var _temp, _this, _ret;

    _classCallCheck(this, UserInput);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.state = {
      inputActive: false,
      file: null
    }, _this.handleKey = function (event) {
      if (event.keyCode === 13 && !event.shiftKey) {
        _this._submitText(event);
      }
    }, _this.handleKeyPress = _lodash2.default.debounce(function () {
      _this.props.onKeyPress(_this.userInput.textContent);
    }, 300, { trailing: true }), _this.handlePaste = function (event) {
      event.preventDefault();
      var text = (event.originalEvent || event).clipboardData.getData("text/plain");
      _this.userInput.textContent = text;
    }, _this._submitText = function (event) {
      event.preventDefault();
      if (_this.props.readOnly) {
        return;
      }
      var text = _this.userInput.textContent;
      var file = _this.state.file;
      if (file) {
        if (text && text.length > 0) {
          _this.props.onSubmit({
            author: 'me',
            type: 'file',
            data: { text: text, file: file }
          });
          _this.setState({ file: null });
          _this.userInput.innerHTML = '';
        } else {
          _this.props.onSubmit({
            author: 'me',
            type: 'file',
            data: { file: file }
          });
          _this.setState({ file: null });
        }
      } else {
        if (text && text.length > 0) {
          _this.props.onSubmit({
            author: 'me',
            type: 'text',
            data: { text: text }
          });
          _this.userInput.innerHTML = '';
        }
      }
    }, _this._handleEmojiPicked = function (emoji) {
      _this.props.onSubmit({
        author: 'me',
        type: 'emoji',
        data: { emoji: emoji }
      });
    }, _this._handleFileSubmit = function (file) {
      _this.setState({ file: file });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  UserInput.prototype.render = function render() {
    var _this2 = this;

    return _react2.default.createElement(
      'div',
      null,
      this.state.file && _react2.default.createElement(
        'div',
        { className: 'file-container' },
        _react2.default.createElement(
          'span',
          { className: 'icon-file-message' },
          _react2.default.createElement('img', { src: _file2.default, alt: 'genericFileIcon', height: 15 })
        ),
        this.state.file && this.state.file.name,
        _react2.default.createElement(
          'span',
          { className: 'delete-file-message', onClick: function onClick() {
              return _this2.setState({ file: null });
            } },
          _react2.default.createElement('img', { src: _close2.default, alt: 'close icon', height: 10, title: 'Remove the file' })
        )
      ),
      _react2.default.createElement(
        'form',
        { className: 'sc-user-input ' + (this.state.inputActive ? 'active' : '') },
        _react2.default.createElement(
          'div',
          {
            role: 'button',
            tabIndex: '0',
            onFocus: function onFocus() {
              _this2.setState({ inputActive: true });
            },
            onBlur: function onBlur() {
              _this2.setState({ inputActive: false });
            },
            ref: function ref(e) {
              _this2.userInput = e;
            },
            onKeyDown: this.handleKey,
            onKeyPress: this.handleKeyPress,
            onPaste: this.handlePaste,
            contentEditable: !this.props.readOnly,
            suppressContentEditableWarning: 'true',
            placeholder: this.props.readOnly ? 'Read only' : 'Write a reply...',
            className: 'sc-user-input--text'
          },
          this.props.typing || ''
        ),
        _react2.default.createElement(
          'div',
          { className: 'sc-user-input--buttons' },
          this.props.showEmoji && !this.props.readOnly && _react2.default.createElement(
            'div',
            { className: 'sc-user-input--button' },
            _react2.default.createElement(_EmojiIcon2.default, { onEmojiPicked: this._handleEmojiPicked })
          ),
          this.props.showFile && !this.props.readOnly && _react2.default.createElement(
            'div',
            { className: 'sc-user-input--button' },
            _react2.default.createElement(_FileIcon2.default, { onChange: function onChange(file) {
                return _this2._handleFileSubmit(file);
              } })
          ),
          (this.props.buttons || []).map(function (buttonCreator, ix) {
            return _react2.default.createElement(
              'div',
              { className: 'sc-user-input--button', key: ix },
              buttonCreator(_this2)
            );
          }),
          _react2.default.createElement(
            'div',
            { className: 'sc-user-input--button' },
            _react2.default.createElement(_SendIcon2.default, { onClick: this._submitText })
          )
        )
      )
    );
  };

  return UserInput;
}(_react.Component);

UserInput.propTypes = process.env.NODE_ENV !== "production" ? {
  onSubmit: _propTypes2.default.func.isRequired,
  showEmoji: _propTypes2.default.bool,
  showFile: _propTypes2.default.bool,
  typing: _propTypes2.default.string,
  buttons: _propTypes2.default.arrayOf(_propTypes2.default.func),
  onKeyPress: _propTypes2.default.func
} : {};

UserInput.defaultProps = {
  showEmoji: true,
  showFile: true
};

exports.default = UserInput;
module.exports = exports['default'];