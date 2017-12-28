import glamorous from 'glamorous'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

import ControlsBar from '../../components/ControlsBar'

const PlayerContainer = glamorous.div({
  minHeight: '480px',
  position: 'relative',
})

const ControlsBarContainer = glamorous.div({
  background: 'linear-gradient(bottom, hsl(0, 0%, 14%) 0%, transparent 100%)',
  bottom: 0,
  position: 'absolute',
  width: 'calc(100% - 1em)',
  padding: '0.5em',
})

class Player extends Component {
  constructor() {
    super()
    this.state = {
      currentTime: 0,
      duration: 0,
      isControlsBarHidden: false,
      isPlaying: false,
    }
  }

  handleOnLoad = () => {
    this.setState(() => ({
      duration: this.player.duration,
    }))
  }

  handlePause = () => {
    this.resetAutoHideControlsBarTimeout()
    this.setState(
      () => ({
        isPlaying: false,
      }),
      () => this.pause(),
    )
  }

  handlePlay = () => {
    this.resetAutoHideControlsBarTimeout()
    this.setState(
      () => ({
        isPlaying: true,
      }),
      () => {
        this.play()
        this.setAutoHideControlsBarTimeout()
      },
    )
  }

  handleTimeUpdate = () => {
    this.setState(() => ({
      currentTime: this.player.currentTime,
    }))
  }

  hideControlsBar = () => this.setState(() => ({
    isControlsBarHidden: true,
  }))

  play = () => this.player.play()

  pause = () => this.player.pause()

  resetAutoHideControlsBarTimeout = () =>
    window.clearTimeout(this.autoHideControlsBarTimeout)

  setAutoHideControlsBarTimeout = () => {
    this.autoHideControlsBarTimeout = window.setTimeout(
      this.hideControlsBar,
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
          currentTime={this.state.currentTime}
          duration={this.state.duration}
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
          onClick={this.state.isPlaying ? this.handlePause : this.handlePlay}
          onLoadedMetadata={this.handleOnLoad}
          onTimeUpdate={this.handleTimeUpdate}
          ref={el => { this.player = el }}
          src={this.props.currentSource}
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
