import glamorous from 'glamorous'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

import Icon from '../../components/Icon'

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

  render() {
    const {
      pause,
      play,
    } = this.props

    if (!pause && !play) return null
    return (
      <ControlsBarContainer>
        {this.renderAction()}
        {this.renderTime()}
      </ControlsBarContainer>
    )
  }
}

ControlsBar.propTypes = {
  currentTime: PropTypes.number,
  duration: PropTypes.number,
  isComplete: PropTypes.bool,
  isPlaying: PropTypes.bool,
  pause: PropTypes.func,
  play: PropTypes.func,
}

ControlsBar.defaultProps = {
  currentTime: 0,
  duration: 0,
  isComplete: false,
  isPlaying: false,
  pause: null,
  play: null,
}

export default ControlsBar
