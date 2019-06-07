'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _MessageList = require('./MessageList');

var _MessageList2 = _interopRequireDefault(_MessageList);

var _UserInput = require('./UserInput');

var _UserInput2 = _interopRequireDefault(_UserInput);

var _Header = require('./Header');

var _Header2 = _interopRequireDefault(_Header);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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
    return _react2.default.createElement(
      'div',
      { className: classList.join(' ') },
      _react2.default.createElement(_Header2.default, _extends({}, this.props.agentProfile, {
        onClose: this.props.onClose
      })),
      _react2.default.createElement(_MessageList2.default, {
        messages: messageList,
        messageClassesBuilder: this.props.messageClassesBuilder,
        imageUrl: this.props.agentProfile.imageUrl,
        onDelete: this.props.readOnly ? null : this.props.onDelete
      }),
      _react2.default.createElement(_UserInput2.default, {
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
}(_react.Component);

ChatWindow.propTypes = process.env.NODE_ENV !== "production" ? {
  agentProfile: _propTypes2.default.shape({
    teamName: _propTypes2.default.string,
    imageUrl: _propTypes2.default.string,
    teamUrl: _propTypes2.default.string
  }),
  isOpen: _propTypes2.default.bool,
  readOnly: _propTypes2.default.bool,
  messageList: _propTypes2.default.arrayOf(_propTypes2.default.object),
  messageClassesBuilder: _propTypes2.default.func,
  showEmoji: _propTypes2.default.bool,
  showFile: _propTypes2.default.bool,
  typing: _propTypes2.default.string,
  buttons: _propTypes2.default.arrayOf(_propTypes2.default.func),
  onClose: _propTypes2.default.func,
  onDelete: _propTypes2.default.func,
  onKeyPress: _propTypes2.default.func,
  onUserInputSubmit: _propTypes2.default.func
} : {};

exports.default = ChatWindow;
module.exports = exports['default'];