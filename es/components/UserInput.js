function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import PropTypes from 'prop-types';
import React, { Component } from 'react';
import SendIcon from './icons/SendIcon';
import EmojiIcon from './icons/EmojiIcon';
import FileIcons from './icons/FileIcon';
import closeIcon from '../assets/close.svg';
import genericFileIcon from '../assets/file.svg';
import _ from 'lodash';

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
    }, _this.handleKeyPress = _.debounce(function () {
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

    return React.createElement(
      'div',
      null,
      this.state.file && React.createElement(
        'div',
        { className: 'file-container' },
        React.createElement(
          'span',
          { className: 'icon-file-message' },
          React.createElement('img', { src: genericFileIcon, alt: 'genericFileIcon', height: 15 })
        ),
        this.state.file && this.state.file.name,
        React.createElement(
          'span',
          { className: 'delete-file-message', onClick: function onClick() {
              return _this2.setState({ file: null });
            } },
          React.createElement('img', { src: closeIcon, alt: 'close icon', height: 10, title: 'Remove the file' })
        )
      ),
      React.createElement(
        'form',
        { className: 'sc-user-input ' + (this.state.inputActive ? 'active' : '') },
        React.createElement(
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
        React.createElement(
          'div',
          { className: 'sc-user-input--buttons' },
          this.props.showEmoji && !this.props.readOnly && React.createElement(
            'div',
            { className: 'sc-user-input--button' },
            React.createElement(EmojiIcon, { onEmojiPicked: this._handleEmojiPicked })
          ),
          this.props.showFile && !this.props.readOnly && React.createElement(
            'div',
            { className: 'sc-user-input--button' },
            React.createElement(FileIcons, { onChange: function onChange(file) {
                return _this2._handleFileSubmit(file);
              } })
          ),
          (this.props.buttons || []).map(function (buttonCreator, ix) {
            return React.createElement(
              'div',
              { className: 'sc-user-input--button', key: ix },
              buttonCreator(_this2)
            );
          }),
          React.createElement(
            'div',
            { className: 'sc-user-input--button' },
            React.createElement(SendIcon, { onClick: this._submitText })
          )
        )
      )
    );
  };

  return UserInput;
}(Component);

UserInput.propTypes = process.env.NODE_ENV !== "production" ? {
  onSubmit: PropTypes.func.isRequired,
  showEmoji: PropTypes.bool,
  showFile: PropTypes.bool,
  typing: PropTypes.string,
  buttons: PropTypes.arrayOf(PropTypes.func),
  onKeyPress: PropTypes.func
} : {};

UserInput.defaultProps = {
  showEmoji: true,
  showFile: true
};

export default UserInput;