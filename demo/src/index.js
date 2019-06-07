import React, { Component } from 'react'
import { render } from 'react-dom'
import { Launcher } from '../../src'
import messageHistory from './messageHistory';
import TestArea from './TestArea';
import Header from './Header';
import Footer from './Footer';
import './../assets/styles'


class Demo extends Component {

  constructor() {
    super();
    this.state = {
      messageList: messageHistory,
      newMessagesCount: 0,
      isOpen: false,
      mute: false
    };
    this.lastId = messageHistory[messageHistory.length - 1].id
  }

  _onMessageWasSent(message) {
    this.setState({
      messageList: [...this.state.messageList, {id: this.lastId + 1, ...message}]
    })
    this.lastId += 1
  }

  _onMessageWasReceived() {
    console.log('NEW MESSAGE')
  }

  _sendMessage(text, avatar) {
    if (text.length > 0) {
      const newMessagesCount = this.state.isOpen ? this.state.newMessagesCount : this.state.newMessagesCount + 1
      this.setState({
        newMessagesCount: newMessagesCount,
        messageList: [...this.state.messageList, {
          id: this.lastId + 1,
          author: 'them',
          type: 'text',
          data: { text },
          author_avatar: avatar
        }]
      })
      this.lastId += 1
    }
  }

  _handleClick() {
    this.setState({
      isOpen: !this.state.isOpen,
      newMessagesCount: 0
    })
  }

  onKeyPress = (userInput) => {
    console.log(userInput)
  }

  onDelete = (msg) => {
    this.setState({messageList: this.state.messageList.filter(({id}) => id!==msg.id)})
  }

  render() {
    const { isOpen, teamText, readOnly, mute } = this.state
    return <div>
      <Header />
      <TestArea
        onMessage={this._sendMessage.bind(this)}
        onTeamTextChange={(text) => this.setState({ teamText: text })}
        onReadOnlyChange={(value) => this.setState({ readOnly: value })}
        onMuteChange={(value) => this.setState({ mute: value })}
      />
      <Launcher
        agentProfile={{
          teamName: 'react-beautiful-chat',
          imageUrl: 'https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png'
        }}
        onMessageWasReceived={this._onMessageWasReceived.bind(this)}
        mute={mute}
        onMessageWasSent={this._onMessageWasSent.bind(this)}
        messageList={this.state.messageList}
        messageClassesBuilder={(msg, key, msgList) => {
          if (msg.author !== 'me') {
            return key % 2 === 1 ? ['odd'] : ['pair']
          }
          if (key === msgList.length -1) {
            return ['last']
          }
        }}
        onTeamClick={teamText ? () => window.alert(teamText) : null}
        newMessagesCount={this.state.newMessagesCount}
        handleClick={this._handleClick.bind(this)}
        isOpen={isOpen}
        readOnly={readOnly}
        onKeyPress={this.onKeyPress}
        onDelete={this.onDelete}
        showEmoji
        showFile
        typing='... typing a message for you ...'
        buttons={[
          (userInput) => {
            return <span className="sc-user-input--send-icon-wrapper">
              <svg
                  version='1.1'
                  className="sc-user-input--send-icon"
                  xmlns='http://www.w3.org/2000/svg'
                  x='0px'
                  y='0px'
                  width='37.393px'
                  height='37.393px'
                  viewBox='0 0 37.393 37.393'
                  enableBackground='new 0 0 37.393 37.393'>
                <g id='Layer_2'>
                  <path d='M36.511,17.594L2.371,2.932c-0.374-0.161-0.81-0.079-1.1,0.21C0.982,3.43,0.896,3.865,1.055,4.241l5.613,13.263
          L2.082,32.295c-0.115,0.372-0.004,0.777,0.285,1.038c0.188,0.169,0.427,0.258,0.67,0.258c0.132,0,0.266-0.026,0.392-0.08
          l33.079-14.078c0.368-0.157,0.607-0.519,0.608-0.919S36.879,17.752,36.511,17.594z M4.632,30.825L8.469,18.45h8.061
          c0.552,0,1-0.448,1-1s-0.448-1-1-1H8.395L3.866,5.751l29.706,12.757L4.632,30.825z' />
                </g>
              </svg>
            </span>
          }
        ]}
      />
      <div style={{height: 200}} />
      <Footer />
    </div>
  }
}

render(<Demo />, document.querySelector('#demo'))
