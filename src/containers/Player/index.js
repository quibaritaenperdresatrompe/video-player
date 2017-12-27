import glamorous from 'glamorous'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

import ControlsBar from '../../components/ControlsBar'

const PlayerContainer = glamorous.div({
  minHeight: '480px',
  position: 'relative',
})

const ControlsBarContainer = glamorous.div({
  backgroundColor: 'hsla(0, 0%, 14%, 0.8)',
  bottom: 0,
  position: 'absolute',
  width: 'calc(100% - 1em)',
  padding: '0.5em',
})

class Player extends Component {
  constructor() {
    super()
    this.state = {
      isPlaying: false,
      isControlsBarHidden: false,
    }
  }

  handlePause = () => {
    window.clearTimeout(this.autoHideControlsBarTimeout)
    this.setState(
      () => ({
        isPlaying: false,
      }),
      () => this.player.pause(),
    )
  }

  handlePlay = () => {
    window.clearTimeout(this.autoHideControlsBarTimeout)
    this.setState(
      () => ({
        isPlaying: true,
      }),
      () => {
        this.player.play()
        this.autoHideControlsBar()
      },
    )
  }

  autoHideControlsBar = () => {
    this.autoHideControlsBarTimeout = window.setTimeout(
      () => this.setState(() => ({
        isControlsBarHidden: true,
      })),
      5000,
    )
  }

  renderControlsBar = () => {
    const {
      isPlaying,
      isControlsBarHidden,
    } = this.state

    if (isPlaying && isControlsBarHidden) return null
    return (
      <ControlsBarContainer>
        <ControlsBar
          pause={isPlaying ? this.handlePause : null}
          play={isPlaying ? null : this.handlePlay}
        />
      </ControlsBarContainer>
    )
  }

  render() {
    return (
      <PlayerContainer>
        <video
          height={480}
          ref={el => { this.player = el }}
          src={this.props.currentSource}
          onClick={this.state.isPlaying ? this.handlePause : this.handlePlay}
        />
        {this.renderControlsBar()}
      </PlayerContainer>
    )
  }
}

Player.propTypes = {
  currentSource: PropTypes.string,
}

Player.defaultProps = {
  currentSource: null,
}

export default Player
