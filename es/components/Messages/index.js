function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import TextMessage from './TextMessage';
import EmojiMessage from './EmojiMessage';
import FileMessage from './FileMessage';
import chatIconUrl from './../../assets/chat-icon.svg';

var Message = function (_Component) {
  _inherits(Message, _Component);

  function Message() {
    var _temp, _this, _ret;

    _classCallCheck(this, Message);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this._renderMessageOfType = function (type) {
      switch (type) {
        case 'text':
          return React.createElement(TextMessage, { message: _this.props.message, onDelete: _this.props.onDelete });
        case 'emoji':
          return React.createElement(EmojiMessage, _this.props.message);
        case 'file':
          return React.createElement(FileMessage, { message: _this.props.message, onDelete: _this.props.onDelete });
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  Message.prototype.render = function render() {
    var contentClassList = ['sc-message--content', this.props.message.author === 'me' ? 'sent' : 'received'].concat(this.props.classes || []);
    var authorAvatarUrl = this.props.message.author_avatar || chatIconUrl;
    return React.createElement(
      'div',
      { className: 'sc-message' },
      React.createElement(
        'div',
        { className: contentClassList.join(' ') },
        React.createElement('div', {
          className: 'sc-message--avatar',
          title: this.props.message.author,
          style: {
            backgroundImage: 'url(' + authorAvatarUrl + ')'
          } }),
        this._renderMessageOfType(this.props.message.type)
      )
    );
  };

  return Message;
}(Component);

export default Message;