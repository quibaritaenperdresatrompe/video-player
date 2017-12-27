import glamorous from 'glamorous'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

const StyledPlayPauseButton = glamorous.div({
  color: 'hsla(0, 0%, 100%, 0.7)',
  cursor: 'pointer',
  display: 'inline-block',
  ':hover': {
    color: 'hsla(0, 0%, 100%, 1)',
  },
  fontSize: '0.8em',
})

class ControlsBar extends Component {
  renderPlayPause = () => {
    const {
      pause,
      play,
    } = this.props

    return (
      <StyledPlayPauseButton onClick={pause || play}>
        {play ? 'PLAY' : 'PAUSE'}
      </StyledPlayPauseButton>
    )
  }

  render() {
    const {
      pause,
      play,
    } = this.props

    if (!pause && !play) return null
    return (
      <div>
        {this.renderPlayPause()}
      </div>
    )
  }
}

ControlsBar.propTypes = {
  pause: PropTypes.func,
  play: PropTypes.func,
}

ControlsBar.defaultProps = {
  pause: null,
  play: null,
}

export default ControlsBar
