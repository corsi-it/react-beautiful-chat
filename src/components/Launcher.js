import PropTypes from 'prop-types'
import React, { Component } from 'react'
import ChatWindow from './ChatWindow'
import launcherIcon from './../assets/logo-no-bg.svg'
import launcherIconActive from './../assets/close-icon.png'
import incomingMessageSound from './../assets/sounds/notification.mp3'

class Launcher extends Component {
  state = {
    launcherIcon,
    isOpen: false
  }
  notification = new Audio(incomingMessageSound)

  componentDidUpdate (prevProps) {
    let messageWasReceived = false
    if (this.isOpened()) {
      if (this.props.messageList.length > prevProps.messageList.length && this.props.messageList.slice(-1).author !== 'me') {
        messageWasReceived = true
      }
    } else {
      if (this.props.newMessagesCount > prevProps.newMessagesCount) {
        messageWasReceived = true
      }
    }
    if (messageWasReceived) {
      this.handleMessageWasReceived()
    }
  }

  handleClick = () => {
    if (this.props.handleClick !== undefined) {
      this.props.handleClick()
    } else {
      this.setState({
        isOpen: !this.state.isOpen
      })
    }
  }

  handleMessageWasReceived = () => {
    if (!this.props.mute) {
      this.notification.play()
    }
    if (this.props.onMessageWasReceived) {
      this.props.onMessageWasReceived()
    }
  }

  isOpened = () => {
    return this.props.hasOwnProperty('isOpen') ? this.props.isOpen : this.state.isOpen
  }

  render () {
    const isOpen = this.isOpened()
    const { showLauncher } = this.props
    const classList = [
      'sc-launcher',
      (isOpen ? 'opened' : '')
    ]
    return (
      <div>
        {showLauncher && <div className={classList.join(' ')} onClick={this.handleClick}>
          <MessageCount count={this.props.newMessagesCount} isOpen={isOpen} />
          <img className={'sc-open-icon'} src={launcherIconActive} />
          <img className={'sc-closed-icon'} src={launcherIcon} />
        </div>}
        <ChatWindow
          messageList={this.props.messageList}
          messageClassesBuilder={this.props.messageClassesBuilder}
          onUserInputSubmit={this.props.onMessageWasSent}
          agentProfile={this.props.agentProfile}
          isOpen={isOpen}
          readOnly={this.props.readOnly}
          onTeamClick={this.props.onTeamClick}
          onClose={this.handleClick}
          showEmoji={this.props.showEmoji}
          showFile={this.props.showFile}
          typing={this.props.typing}
          buttons={this.props.buttons}
          onKeyPress={this.props.onKeyPress}
          onKeyPressDebounce={this.props.onKeyPressDebounce}
          onDelete={this.props.onDelete}
        />
      </div>
    )
  }
}

const MessageCount = (props) => {
  if (props.count === 0 || props.isOpen === true) { return null }
  return (
    <div className={'sc-new-messsages-count'}>
      {props.count}
    </div>
  )
}

Launcher.propTypes = {
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
}

Launcher.defaultProps = {
  showLauncher: true,
  newMessagesCount: 0,
  readOnly: false,
  mute: false
}

export default Launcher
