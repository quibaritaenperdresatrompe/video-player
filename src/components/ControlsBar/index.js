import glamorous from 'glamorous'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

import PauseIcon from '../../components/PauseIcon'
import PlayIcon from '../../components/PlayIcon'

const StyledControlContainer = glamorous.span({
  cursor: 'pointer',
})

class ControlsBar extends Component {
  renderPlayPause = () => {
    const {
      pause,
      play,
    } = this.props

    return (
      <StyledControlContainer onClick={pause || play}>
        {play ? <PlayIcon size='1.2em' /> : <PauseIcon size='1.2em' />}
      </StyledControlContainer>
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
