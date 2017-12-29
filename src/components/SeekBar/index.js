import glamorous from 'glamorous'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

const SeekBarContainer = glamorous.div(({ size }) => ({
  margin: '0.5em 0',
  backgroundColor: 'hsla(0, 0%, 100%, 0.8)',
  height: size,
  opacity: '0.8',
  position: 'relative',
  ':hover': {
    opacity: '1',
  },
}))

const StyledSeekBar = glamorous.input(({ size }) => {
  const thumbStyle = {
    appearance: 'none',
    backgroundColor: 'hsl(0, 68%, 50%)',
    border: 0,
    borderRadius: '50%',
    height: `calc(${size} * 5)`,
    width: `calc(${size} * 5)`,
  }

  return {
    appearance: 'none',
    backgroundColor: 'transparent',
    border: 0,
    cursor: 'pointer',
    height: size,
    margin: 0,
    outline: 'none',
    position: 'relative',
    width: '100%',
    '::-webkit-slider-thumb': thumbStyle,
    '::-moz-range-thumb': thumbStyle,
    '::-ms-thumb': thumbStyle,
  }
})

const StyledProgressBar = glamorous.div(({ progress }) => ({
  backgroundColor: 'hsl(0, 68%, 50%)',
  height: '100%',
  left: 0,
  position: 'absolute',
  top: 0,
  width: progress === 100
    ? `${progress}%`
    : `calc(${progress}% + 1px)`,
}))

class SeekBar extends Component {
  constructor() {
    super()
    this.state = {
      isSeeking: false,
    }
  }

  handleChange = ({ target: { value } }) => {
    this.props.seekTo(parseFloat(value, 10))
    this.setState(() => ({
      isSeeking: true,
    }))
  }

  render() {
    const {
      currentTime,
      duration,
      size,
    } = this.props

    const progress = duration === 0
      ? 0
      : (currentTime * 100) / duration

    return (
      <SeekBarContainer size={size}>
        <StyledSeekBar
          max={duration}
          onChange={this.handleChange}
          size={size}
          step='any'
          type='range'
          value={currentTime}
        />
        <StyledProgressBar
          progress={progress}
          size={size}
        />
      </SeekBarContainer>
    )
  }
}

SeekBar.propTypes = {
  currentTime: PropTypes.number,
  duration: PropTypes.number,
  seekTo: PropTypes.func,
  size: PropTypes.string,
}

SeekBar.defaultProps = {
  currentTime: 0,
  duration: 0,
  seekTo: () => undefined,
  size: '0.2em',
}

export default SeekBar
