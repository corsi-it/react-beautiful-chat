function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ChatWindow from './ChatWindow';
import launcherIcon from './../assets/logo-no-bg.svg';
import launcherIconActive from './../assets/close-icon.png';
import incomingMessageSound from './../assets/sounds/notification.mp3';

var Launcher = function (_Component) {
  _inherits(Launcher, _Component);

  function Launcher() {
    var _temp, _this, _ret;

    _classCallCheck(this, Launcher);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.state = {
      launcherIcon: launcherIcon,
      isOpen: false
    }, _this.notification = new Audio(incomingMessageSound), _this.handleClick = function () {
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
    return React.createElement(
      'div',
      null,
      showLauncher && React.createElement(
        'div',
        { className: classList.join(' '), onClick: this.handleClick },
        React.createElement(MessageCount, { count: this.props.newMessagesCount, isOpen: isOpen }),
        React.createElement('img', { className: 'sc-open-icon', src: launcherIconActive }),
        React.createElement('img', { className: 'sc-closed-icon', src: launcherIcon })
      ),
      React.createElement(ChatWindow, {
        messageList: this.props.messageList,
        messageClassesBuilder: this.props.messageClassesBuilder,
        onUserInputSubmit: this.props.onMessageWasSent,
        agentProfile: this.props.agentProfile,
        isOpen: isOpen,
        readOnly: this.props.readOnly,
        onTeamClick: this.props.onTeamClick,
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
}(Component);

var MessageCount = function MessageCount(props) {
  if (props.count === 0 || props.isOpen === true) {
    return null;
  }
  return React.createElement(
    'div',
    { className: 'sc-new-messsages-count' },
    props.count
  );
};

Launcher.propTypes = process.env.NODE_ENV !== "production" ? {
  showLauncher: PropTypes.bool,
  onMessageWasReceived: PropTypes.func,
  onMessageWasSent: PropTypes.func,
  newMessagesCount: PropTypes.number,
  isOpen: PropTypes.bool,
  readOnly: PropTypes.bool,
  handleClick: PropTypes.func,
  messageList: PropTypes.arrayOf(PropTypes.object),
  messageClassesBuilder: PropTypes.func,
  showEmoji: PropTypes.bool,
  showFile: PropTypes.bool,
  typing: PropTypes.string,
  buttons: PropTypes.arrayOf(PropTypes.func),
  onKeyPress: PropTypes.func,
  onDelete: PropTypes.func,
  mute: PropTypes.bool
} : {};

Launcher.defaultProps = {
  showLauncher: true,
  newMessagesCount: 0,
  readOnly: false,
  mute: false
};

export default Launcher;