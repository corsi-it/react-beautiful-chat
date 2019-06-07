'use strict';

exports.__esModule = true;

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ChatWindow = require('./ChatWindow');

var _ChatWindow2 = _interopRequireDefault(_ChatWindow);

var _logoNoBg = require('./../assets/logo-no-bg.svg');

var _logoNoBg2 = _interopRequireDefault(_logoNoBg);

var _closeIcon = require('./../assets/close-icon.png');

var _closeIcon2 = _interopRequireDefault(_closeIcon);

var _notification = require('./../assets/sounds/notification.mp3');

var _notification2 = _interopRequireDefault(_notification);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Launcher = function (_Component) {
  _inherits(Launcher, _Component);

  function Launcher() {
    var _temp, _this, _ret;

    _classCallCheck(this, Launcher);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.state = {
      launcherIcon: _logoNoBg2.default,
      isOpen: false
    }, _this.notification = new Audio(_notification2.default), _this.handleClick = function () {
      if (_this.props.handleClick !== undefined) {
        _this.props.handleClick();
      } else {
        _this.setState({
          isOpen: !_this.state.isOpen
        });
      }
    }, _this.handleMessageWasReceived = function () {
      if (!_this.props.mute) {
        _this.notification.play();
      }
      if (_this.props.onMessageWasReceived) {
        _this.props.onMessageWasReceived();
      }
    }, _this.isOpened = function () {
      return _this.props.hasOwnProperty('isOpen') ? _this.props.isOpen : _this.state.isOpen;
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  Launcher.prototype.componentDidUpdate = function componentDidUpdate(prevProps) {
    var messageWasReceived = false;
    if (this.isOpened()) {
      if (this.props.messageList.length > prevProps.messageList.length && this.props.messageList.slice(-1).author !== 'me') {
        messageWasReceived = true;
      }
    } else {
      if (this.props.newMessagesCount > prevProps.newMessagesCount) {
        messageWasReceived = true;
      }
    }
    if (messageWasReceived) {
      this.handleMessageWasReceived();
    }
  };

  Launcher.prototype.render = function render() {
    var isOpen = this.isOpened();
    var showLauncher = this.props.showLauncher;

    var classList = ['sc-launcher', isOpen ? 'opened' : ''];
    return _react2.default.createElement(
      'div',
      null,
      showLauncher && _react2.default.createElement(
        'div',
        { className: classList.join(' '), onClick: this.handleClick },
        _react2.default.createElement(MessageCount, { count: this.props.newMessagesCount, isOpen: isOpen }),
        _react2.default.createElement('img', { className: 'sc-open-icon', src: _closeIcon2.default }),
        _react2.default.createElement('img', { className: 'sc-closed-icon', src: _logoNoBg2.default })
      ),
      _react2.default.createElement(_ChatWindow2.default, {
        messageList: this.props.messageList,
        messageClassesBuilder: this.props.messageClassesBuilder,
        onUserInputSubmit: this.props.onMessageWasSent,
        agentProfile: this.props.agentProfile,
        isOpen: isOpen,
        readOnly: this.props.readOnly,
        onClose: this.handleClick,
        showEmoji: this.props.showEmoji,
        showFile: this.props.showFile,
        typing: this.props.typing,
        buttons: this.props.buttons,
        onKeyPress: this.props.onKeyPress,
        onKeyPressDebounce: this.props.onKeyPressDebounce,
        onDelete: this.props.onDelete
      })
    );
  };

  return Launcher;
}(_react.Component);

var MessageCount = function MessageCount(props) {
  if (props.count === 0 || props.isOpen === true) {
    return null;
  }
  return _react2.default.createElement(
    'div',
    { className: 'sc-new-messsages-count' },
    props.count
  );
};

Launcher.propTypes = process.env.NODE_ENV !== "production" ? {
  showLauncher: _propTypes2.default.bool,
  onMessageWasReceived: _propTypes2.default.func,
  onMessageWasSent: _propTypes2.default.func,
  newMessagesCount: _propTypes2.default.number,
  isOpen: _propTypes2.default.bool,
  readOnly: _propTypes2.default.bool,
  handleClick: _propTypes2.default.func,
  messageList: _propTypes2.default.arrayOf(_propTypes2.default.object),
  messageClassesBuilder: _propTypes2.default.func,
  showEmoji: _propTypes2.default.bool,
  showFile: _propTypes2.default.bool,
  typing: _propTypes2.default.string,
  buttons: _propTypes2.default.arrayOf(_propTypes2.default.func),
  onKeyPress: _propTypes2.default.func,
  onDelete: _propTypes2.default.func,
  mute: _propTypes2.default.bool
} : {};

Launcher.defaultProps = {
  showLauncher: true,
  newMessagesCount: 0,
  readOnly: false,
  mute: false
};

exports.default = Launcher;
module.exports = exports['default'];