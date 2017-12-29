import glamorous from 'glamorous'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

import Icon from '../../components/Icon'
import RangeBar from '../../components/RangeBar'

const ControlsBarContainer = glamorous.div({
  display: 'flex',
  alignItems: 'center',
})

const ControlContainer = glamorous.span({
  cursor: 'pointer',
  margin: '0 0.5em',
})

const TimeContainer = glamorous.span({
  fontSize: '0.6em',
  margin: '0 0.5em',
})

const secondsToTime = seconds => new Date(seconds * 1e3).toISOString().substr(11, 8)

class ControlsBar extends Component {
  getActionIcon = () => {
    const {
      isPlaying,
      isComplete,
    } = this.props

    if (isComplete) return 'ReplayIcon'
    if (isPlaying) return 'PauseIcon'
    return 'PlayIcon'
  }

  getVolumeIcon = () => {
    const {
      isMuted,
      volume,
    } = this.props

    if (isMuted || volume === 0) return 'VolumeOffIcon'
    if (volume < 0.5) return 'VolumeDownIcon'
    return 'VolumeUpIcon'
  }

  renderAction = () => {
    const {
      isPlaying,
      isComplete,
      pause,
      play,
    } = this.props

    const ActionIcon = this.getActionIcon()

    return (
      <ControlContainer onClick={isPlaying && !isComplete ? pause : play}>
        <Icon
          iconName={ActionIcon}
          size='1.2em'
        />
      </ControlContainer>
    )
  }

  renderTime = () => {
    const currentTime = secondsToTime(this.props.currentTime)
    const totalTime = secondsToTime(this.props.duration)
    return (
      <TimeContainer>
        {`${currentTime} / ${totalTime}`}
      </TimeContainer>
    )
  }

  renderVolume = () => {
    const {
      isMuted,
      mute,
      unmute,
    } = this.props
    const VolumeIcon = this.getVolumeIcon()
    return (
      <ControlContainer onClick={isMuted ? unmute : mute}>
        <Icon
          iconName={VolumeIcon}
          size='1.2em'
        />
      </ControlContainer>
    )
  }

  renderVolumeBar = () => {
    const {
      volume,
      updateVolumeTo,
    } = this.props
    return (
      <ControlContainer>
        <RangeBar
          currentValue={volume}
          setTo={updateVolumeTo}
          size='0.15em'
        />
      </ControlContainer>
    )
  }

  render() {
    const {
      pause,
      play,
    } = this.props

    if (!pause && !play) return null
    return (
      <ControlsBarContainer>
        {this.renderAction()}
        {this.renderVolume()}
        {this.renderVolumeBar()}
        {this.renderTime()}
      </ControlsBarContainer>
    )
  }
}

ControlsBar.propTypes = {
  currentTime: PropTypes.number,
  duration: PropTypes.number,
  isComplete: PropTypes.bool,
  isMuted: PropTypes.bool,
  isPlaying: PropTypes.bool,
  mute: PropTypes.func,
  pause: PropTypes.func,
  play: PropTypes.func,
  unmute: PropTypes.func,
  volume: PropTypes.number,
  updateVolumeTo: PropTypes.func,
}

ControlsBar.defaultProps = {
  currentTime: 0,
  duration: 0,
  isComplete: false,
  isMuted: false,
  isPlaying: false,
  mute: () => undefined,
  pause: null,
  play: null,
  unmute: () => undefined,
  volume: 1,
  updateVolumeTo: () => undefined,
}

export default ControlsBar
