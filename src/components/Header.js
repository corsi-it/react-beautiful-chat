import React, { Component } from 'react'
import closeIcon from './../assets/close-icon.png'

class Header extends Component {
  render () {
    let teamNameClasses = ['sc-header--team-name']
    if (this.props.onTeamClick) {
      teamNameClasses.push('clickable')
    }
    return (
      <div className='sc-header'>
        <img className='sc-header--img' src={this.props.imageUrl} alt='' />
        <div className={teamNameClasses.join(' ')} onClick={this.props.onTeamClick}> {this.props.teamName} </div>
        <div className='sc-header--close-button' onClick={this.props.onClose}>
          <img src={closeIcon} alt='' />
        </div>
      </div>
    )
  }
}

export default Header
