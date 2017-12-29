import glamorous from 'glamorous'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

import ControlsBar from '../../components/ControlsBar'

const PlayerContainer = glamorous.div(({ isCursorHidden }) => ({
  cursor: isCursorHidden ? 'none' : 'default',
  minHeight: '480px',
  position: 'relative',
}))

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
      autoHideControlsBarTimeout: null,
      currentTime: 0,
      duration: 0,
      isControlsBarHidden: false,
      isComplete: false,
      isPlaying: false,
    }
  }

  handleMouseEnter = () => {
    this.showControlsBar(true)
  }

  handleMouseLeave = () => {
    this.hideControlsBar()
  }

  handleMouseMove = () => {
    this.showControlsBar(true)
  }

  handleLoad = () => {
    this.setState(() => ({
      duration: this.player.duration,
    }))
  }

  handlePause = () => {
    this.pause()
    this.setState(() => ({
      isPlaying: false,
    }))
    this.showControlsBar()
  }

  handlePlay = () => {
    this.play()
    this.setState(() => ({
      isPlaying: true,
    }))
    this.hideControlsBar(true)
  }

  handleTimeUpdate = () => {
    this.setState(() => ({
      currentTime: this.player.currentTime,
      isComplete: this.player.currentTime === this.state.duration,
    }))
  }

  hideControlsBar = (isDelayed = false) => {
    if (isDelayed) {
      this.hideControlsBarWithDelay()
    } else {
      this.setState(() => ({
        isControlsBarHidden: true,
      }))
    }
  }

  hideControlsBarWithDelay = () => {
    const timeout = window.setTimeout(this.hideControlsBar, 3e3)
    this.setState(() => ({
      autoHideControlsBarTimeout: timeout,
    }))
  }

  play = () => this.player.play()

  pause = () => this.player.pause()

  showControlsBar = (isTemporary = false) => {
    window.clearTimeout(this.state.autoHideControlsBarTimeout)
    this.setState(
      () => ({
        isControlsBarHidden: false,
      }),
      () => {
        if (isTemporary) this.hideControlsBarWithDelay()
      },
    )
  }


  }

  renderControlsBar = () => {
    const {
      currentTime,
      duration,
      isPlaying,
      isControlsBarHidden,
      isComplete,
    } = this.state

    if (isPlaying && isControlsBarHidden) return null
    return (
      <ControlsBarContainer>
        <ControlsBar
          currentTime={currentTime}
          duration={duration}
          isPlaying={isPlaying}
          isComplete={isComplete}
          pause={this.handlePause}
          play={this.handlePlay}
        />
      </ControlsBarContainer>
    )
  }

  render() {
    const {
      isControlsBarHidden,
      isComplete,
      isPlaying,
    } = this.state
    const controlAction = isPlaying && !isComplete ? this.handlePause : this.handlePlay
    const isCursorHidden = isPlaying && isControlsBarHidden

    return (
      <PlayerContainer
        isCursorHidden={isCursorHidden}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        onMouseMove={this.handleMouseMove}
      >
        <video
          height={480}
          onClick={controlAction}
          onLoadedMetadata={this.handleLoad}
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
