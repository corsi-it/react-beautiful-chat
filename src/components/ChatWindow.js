import PropTypes from 'prop-types'
import React, { Component } from 'react'
import MessageList from './MessageList'
import UserInput from './UserInput'
import Header from './Header'

class ChatWindow extends Component {
  onUserInputSubmit = (message) => {
    this.props.onUserInputSubmit(message)
  }

  onMessageReceived = (message) => {
    this.setState({ messages: [...this.state.messages, message] })
  }

  render () {
    let messageList = this.props.messageList || []
    let classList = [
      'sc-chat-window',
      (this.props.isOpen ? 'opened' : 'closed')
    ]
    return (
      <div className={classList.join(' ')}>
        <Header
          {...this.props.agentProfile}
          onClose={this.props.onClose}
        />
        <MessageList
          messages={messageList}
          messageClassesBuilder={this.props.messageClassesBuilder}
          imageUrl={this.props.agentProfile.imageUrl}
          onDelete={this.props.readOnly ? null : this.props.onDelete}
        />
        <UserInput
          showEmoji={this.props.showEmoji}
          onSubmit={this.onUserInputSubmit}
          showFile={this.props.showFile}
          onKeyPress={this.props.onKeyPress}
          typing={this.props.typing}
          readOnly={this.props.readOnly}
          buttons={this.props.buttons}
        />
      </div>
    )
  }
}

ChatWindow.propTypes = {
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
}

export default ChatWindow
