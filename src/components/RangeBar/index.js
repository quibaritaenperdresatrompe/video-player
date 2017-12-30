import glamorous from 'glamorous'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

const RangeBarContainer = glamorous.div(({ size }) => ({
  backgroundColor: 'hsla(0, 0%, 100%, 0.8)',
  margin: `calc(${size} * 2) 0`,
  opacity: '0.8',
  position: 'relative',
  ':hover': {
    opacity: '1',
  },
}))

const StyledRangeBar = glamorous.input(({ color, size }) => {
  const thumbStyle = {
    appearance: 'none',
    backgroundColor: color,
    border: 0,
    borderRadius: '50%',
    height: `calc(${size} * 5)`,
    margin: `${size} 0`,
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

const StyledCurrentValueBar = glamorous.div(({ color, progress, size }) => ({
  backgroundColor: color,
  height: size,
  left: 0,
  position: 'absolute',
  top: 0,
  width: progress === 100
    ? `${progress}%`
    : `calc(${progress}% + 1px)`,
}))

class RangeBar extends Component {
  constructor() {
    super()
    this.state = {
      isSetting: false,
    }
  }

  handleChange = ({ target: { value } }) => {
    this.props.setTo(parseFloat(value, 10))
    this.setState(() => ({
      isSetting: true,
    }))
  }

  render() {
    const {
      color,
      currentValue,
      maxValue,
      size,
    } = this.props

    const progress = maxValue === 0
      ? 0
      : (currentValue * 100) / maxValue

    return (
      <RangeBarContainer size={size}>
        <StyledRangeBar
          color={color}
          max={maxValue}
          onChange={this.handleChange}
          size={size}
          step='any'
          type='range'
          value={currentValue}
        />
        <StyledCurrentValueBar
          color={color}
          progress={progress}
          size={size}
        />
      </RangeBarContainer>
    )
  }
}

RangeBar.propTypes = {
  color: PropTypes.string,
  currentValue: PropTypes.number,
  maxValue: PropTypes.number,
  setTo: PropTypes.func,
  size: PropTypes.string,
}

RangeBar.defaultProps = {
  color: 'hsla(0, 0%, 100%, 1)',
  currentValue: 0,
  maxValue: 1,
  setTo: () => undefined,
  size: '0.2em',
}

export default RangeBar
