import React, { Component } from 'react'
import TextMessage from './TextMessage'
import EmojiMessage from './EmojiMessage'
import FileMessage from './FileMessage'
import chatIconUrl from './../../assets/chat-icon.svg'

class Message extends Component {
  _renderMessageOfType = (type) => {
    switch (type) {
      case 'text':
        return <TextMessage message={this.props.message} onDelete={this.props.onDelete} />
      case 'emoji':
        return <EmojiMessage {...this.props.message} />
      case 'file':
        return <FileMessage message={this.props.message} onDelete={this.props.onDelete} />
    }
  }

  render () {
    let contentClassList = [
      'sc-message--content',
      (this.props.message.author === 'me' ? 'sent' : 'received'),
      ...this.props.classes || []
    ]
    let authorAvatarUrl = this.props.message.author_avatar || chatIconUrl
    return (
      <div className='sc-message'>
        <div className={contentClassList.join(' ')}>
          <div
            className='sc-message--avatar'
            title={this.props.message.author}
            style={{
              backgroundImage: `url(${authorAvatarUrl})`
            }} />
          {this._renderMessageOfType(this.props.message.type)}
        </div>
      </div>)
  }
}

export default Message
