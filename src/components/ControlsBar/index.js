import glamorous from 'glamorous'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

import PauseIcon from '../../components/PauseIcon'
import PlayIcon from '../../components/PlayIcon'

const ControlsBarContainer = glamorous.div({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
})

const ControlContainer = glamorous.span({
  cursor: 'pointer',
})

const TimeContainer = glamorous.span({
  fontSize: '0.6em',
})

const secondsToTime = seconds => new Date(seconds * 1e3).toISOString().substr(11, 8)

class ControlsBar extends Component {
  renderPlayPause = () => {
    const {
      pause,
      play,
    } = this.props

    return (
      <ControlContainer onClick={pause || play}>
        {play ? <PlayIcon size='1.2em' /> : <PauseIcon size='1.2em' />}
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
        {this.renderPlayPause()}
        {this.renderTime()}
      </ControlsBarContainer>
    )
  }
}

ControlsBar.propTypes = {
  currentTime: PropTypes.number,
  duration: PropTypes.number,
  pause: PropTypes.func,
  play: PropTypes.func,
}

ControlsBar.defaultProps = {
  currentTime: 0,
  duration: 0,
  pause: null,
  play: null,
}

export default ControlsBar
