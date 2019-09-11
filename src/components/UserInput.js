import PropTypes from 'prop-types'
import React, { Component } from 'react'
import SendIcon from './icons/SendIcon'
import EmojiIcon from './icons/EmojiIcon'
import FileIcons from './icons/FileIcon'
import closeIcon from '../assets/close.svg'
import genericFileIcon from '../assets/file.svg'
import _ from 'lodash'

class UserInput extends Component {
  state = {
    inputActive: false,
    file: null
  }

  handleKey = (event) => {
    if (event.keyCode === 13 && !event.shiftKey) {
      this._submitText(event)
    }
  }

  handleKeyPress = _.debounce(() => {
    this.props.onKeyPress(this.userInput.textContent)
  }, 300, { trailing: true })

  handlePaste = (event) => {
    event.preventDefault();
    const text = (event.originalEvent || event).clipboardData.getData(
      "text/plain"
    );
    document.execCommand("insertText", false, text);
  }

  _submitText = (event) => {
    event.preventDefault()
    if (this.props.readOnly) {
      return
    }
    const text = this.userInput.textContent
    const file = this.state.file
    if (file) {
      if (text && text.length > 0) {
        this.props.onSubmit({
          author: 'me',
          type: 'file',
          data: { text, file }
        })
        this.setState({ file: null })
        this.userInput.innerHTML = ''
      } else {
        this.props.onSubmit({
          author: 'me',
          type: 'file',
          data: { file }
        })
        this.setState({ file: null })
      }
    } else {
      if (text && text.length > 0) {
        this.props.onSubmit({
          author: 'me',
          type: 'text',
          data: { text }
        })
        this.userInput.innerHTML = ''
      }
    }
  }

  _handleEmojiPicked = (emoji) => {
    this.props.onSubmit({
      author: 'me',
      type: 'emoji',
      data: { emoji }
    })
  }

  _handleFileSubmit = (file) => {
    this.setState({ file })
  }

  render () {
    return (
      <div>
        {
          this.state.file &&
          <div className='file-container' >
            <span className='icon-file-message'><img src={genericFileIcon} alt='genericFileIcon' height={15} /></span>
            {this.state.file && this.state.file.name}
            <span className='delete-file-message' onClick={() => this.setState({ file: null })} ><img src={closeIcon} alt='close icon' height={10} title='Remove the file' /></span>
          </div>
        }
        <form className={`sc-user-input ${(this.state.inputActive ? 'active' : '')}`}>
          <div
            role='button'
            tabIndex='0'
            onFocus={() => { this.setState({ inputActive: true }) }}
            onBlur={() => { this.setState({ inputActive: false }) }}
            ref={(e) => { this.userInput = e }}
            onKeyDown={this.handleKey}
            onKeyPress={this.handleKeyPress}
            onPaste={this.handlePaste}
            contentEditable={!this.props.readOnly}
            suppressContentEditableWarning='true'
            placeholder={this.props.readOnly ? 'Read only' : 'Write a reply...'}
            className='sc-user-input--text'
          >{this.props.typing || ''}
          </div>
          <div className='sc-user-input--buttons'>
            {this.props.showEmoji && !this.props.readOnly &&
              <div className='sc-user-input--button'>
                <EmojiIcon onEmojiPicked={this._handleEmojiPicked} />
              </div>
            }
            {this.props.showFile && !this.props.readOnly &&
              <div className='sc-user-input--button'>
                <FileIcons onChange={(file) => this._handleFileSubmit(file)} />
              </div>
            }
            {(this.props.buttons || []).map((buttonCreator, ix) => (
              <div className='sc-user-input--button' key={ix}>
                {buttonCreator(this)}
              </div>
            ))}
            <div className='sc-user-input--button'>
              <SendIcon onClick={this._submitText} />
            </div>
          </div>
        </form>
      </div>
    )
  }
}

UserInput.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  showEmoji: PropTypes.bool,
  showFile: PropTypes.bool,
  typing: PropTypes.string,
  buttons: PropTypes.arrayOf(PropTypes.func),
  onKeyPress: PropTypes.func
}

UserInput.defaultProps = {
  showEmoji: true,
  showFile: true
}

export default UserInput
