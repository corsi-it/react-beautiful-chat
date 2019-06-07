var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import PropTypes from 'prop-types';
import React, { Component } from 'react';
import MessageList from './MessageList';
import UserInput from './UserInput';
import Header from './Header';

var ChatWindow = function (_Component) {
  _inherits(ChatWindow, _Component);

  function ChatWindow() {
    var _temp, _this, _ret;

    _classCallCheck(this, ChatWindow);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.onUserInputSubmit = function (message) {
      _this.props.onUserInputSubmit(message);
    }, _this.onMessageReceived = function (message) {
      _this.setState({ messages: [].concat(_this.state.messages, [message]) });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  ChatWindow.prototype.render = function render() {
    var messageList = this.props.messageList || [];
    var classList = ['sc-chat-window', this.props.isOpen ? 'opened' : 'closed'];
    return React.createElement(
      'div',
      { className: classList.join(' ') },
      React.createElement(Header, _extends({}, this.props.agentProfile, {
        onClose: this.props.onClose
      })),
      React.createElement(MessageList, {
        messages: messageList,
        messageClassesBuilder: this.props.messageClassesBuilder,
        imageUrl: this.props.agentProfile.imageUrl,
        onDelete: this.props.readOnly ? null : this.props.onDelete
      }),
      React.createElement(UserInput, {
        showEmoji: this.props.showEmoji,
        onSubmit: this.onUserInputSubmit,
        showFile: this.props.showFile,
        onKeyPress: this.props.onKeyPress,
        typing: this.props.typing,
        readOnly: this.props.readOnly,
        buttons: this.props.buttons
      })
    );
  };

  return ChatWindow;
}(Component);

ChatWindow.propTypes = process.env.NODE_ENV !== "production" ? {
  agentProfile: PropTypes.shape({
    teamName: PropTypes.string,
    imageUrl: PropTypes.string,
    teamUrl: PropTypes.string
  }),
  isOpen: PropTypes.bool,
  readOnly: PropTypes.bool,
  messageList: PropTypes.arrayOf(PropTypes.object),
  messageClassesBuilder: PropTypes.func,
  showEmoji: PropTypes.bool,
  showFile: PropTypes.bool,
  typing: PropTypes.string,
  buttons: PropTypes.arrayOf(PropTypes.func),
  onClose: PropTypes.func,
  onDelete: PropTypes.func,
  onKeyPress: PropTypes.func,
  onUserInputSubmit: PropTypes.func
} : {};

export default ChatWindow;