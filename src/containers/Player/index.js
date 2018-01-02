import glamorous from 'glamorous'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

import ControlsBar from '../../components/ControlsBar'
import RangeBar from '../../components/RangeBar'

export const SPACE_KEY_CODE = 32
export const ESC_KEY_CODE = 27

const PlayerContainer = glamorous.div(
  ({ isCursorHidden }) => ({
    cursor: isCursorHidden ? 'none' : 'default',
  }),
  ({ isFullscreenMode }) => {
    if (isFullscreenMode) {
      return {
        backgroundColor: 'hsl(0, 0%, 16%)',
        bottom: 0,
        height: '100vh',
        left: 0,
        margin: 'auto',
        position: 'absolute',
        width: '100vw',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }
    }
    return {
      position: 'relative',
    }
  },
)

const ControlsContainer = glamorous.div({
  background: 'linear-gradient(bottom, hsl(0, 0%, 14%) 0%, transparent 100%)',
  bottom: 0,
  left: 0,
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
      isComplete: false,
      isControlsBarHidden: false,
      isFocused: false,
      isFullscreenMode: false,
      isMuted: false,
      isPlaying: false,
      volume: 1,
    }
  }

  componentWillMount() {
    window.addEventListener('keyup', this.handleKeyUp)
  }

  componentWillUnmount() {
    window.removeEventListener('keyup', this.handleKeyUp)
  }

  handleEnterFullscreenMode = () => {
    this.setState(() => ({
      isFullscreenMode: true,
    }))
  }

  handleExitFullscreenMode = () => {
    this.setState(() => ({
      isFullscreenMode: false,
    }))
  }

  handleKeyUp = ({ keyCode }) => {
    if (this.state.isFocused) {
      switch (keyCode) {
        case SPACE_KEY_CODE:
          if (this.state.isPlaying) this.handlePause()
          else this.handlePlay()
          break
        case ESC_KEY_CODE:
          if (this.state.isFullscreenMode) this.handleExitFullscreenMode()
          break
        default:
          break
      }
    }
  }

  handleLoad = () => {
    this.setState(() => ({
      duration: this.player.duration,
    }))
  }

  handleMouseEnter = () => {
    this.showControlsBar(true)
    this.setState(() => ({
      isFocused: true,
    }))
  }

  handleMouseLeave = () => {
    this.hideControlsBar()
    this.setState(() => ({
      isFocused: false,
    }))
  }

  handleMouseMove = () => {
    this.showControlsBar(true)
  }

  handleMute = () => {
    this.mute()
    this.setState(() => ({
      isMuted: true,
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

  handleSeekTo = currentTime => {
    this.player.currentTime = currentTime
    this.setState(() => ({ currentTime }))
  }

  handleTimeUpdate = () => {
    this.setState(() => ({
      currentTime: this.player.currentTime,
      isComplete: this.player.currentTime === this.state.duration,
    }))
  }

  handleUnmute = () => {
    this.unmute()
    this.setState(() => ({
      isMuted: false,
    }))
  }

  handleUpdateVolumeTo = volume => {
    this.player.volume = volume
    this.setState(() => ({ volume }))
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

  mute = () => {
    this.player.muted = true
  }

  unmute = () => {
    this.player.muted = false
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

  renderControlsBar = () => {
    const {
      currentTime,
      duration,
      isComplete,
      isControlsBarHidden,
      isFullscreenMode,
      isMuted,
      isPlaying,
      volume,
    } = this.state

    if (isPlaying && !isComplete && isControlsBarHidden) return null
    return (
      <ControlsContainer className='Controls'>
        <RangeBar
          currentValue={currentTime}
          maxValue={duration}
          setTo={this.handleSeekTo}
          color='hsl(0, 68%, 50%)'
        />
        <ControlsBar
          currentTime={currentTime}
          duration={duration}
          enterFullscreenMode={this.handleEnterFullscreenMode}
          exitFullscreenMode={this.handleExitFullscreenMode}
          isComplete={isComplete}
          isFullscreenMode={isFullscreenMode}
          isMuted={isMuted}
          isPlaying={isPlaying}
          mute={this.handleMute}
          pause={this.handlePause}
          play={this.handlePlay}
          unmute={this.handleUnmute}
          updateVolumeTo={this.handleUpdateVolumeTo}
          volume={volume}
        />
      </ControlsContainer>
    )
  }

  render() {
    const {
      isControlsBarHidden,
      isComplete,
      isFullscreenMode,
      isPlaying,
    } = this.state
    const controlAction = isPlaying && !isComplete ? this.handlePause : this.handlePlay
    const isCursorHidden = isPlaying && isControlsBarHidden

    if (!this.props.medium) return null
    return (
      <div>
        <PlayerContainer
          isCursorHidden={isCursorHidden}
          isFullscreenMode={isFullscreenMode}
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
          onMouseMove={this.handleMouseMove}
        >
          <video
            height={isFullscreenMode ? '100%' : this.props.height}
            onClick={controlAction}
            onLoadedMetadata={this.handleLoad}
            onTimeUpdate={this.handleTimeUpdate}
            ref={el => { this.player = el }}
            src={this.props.medium.source}
          />
          {this.renderControlsBar()}
        </PlayerContainer>
        <h3>{this.props.medium.title}</h3>
      </div>
    )
  }
}

Player.propTypes = {
  medium: PropTypes.shape({
    title: PropTypes.string,
    source: PropTypes.string,
  }),
  height: PropTypes.number,
}

Player.defaultProps = {
  medium: null,
  height: 480,
}

export default Player
