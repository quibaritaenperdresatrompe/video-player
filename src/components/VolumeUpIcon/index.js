import glamorous from 'glamorous'
import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'

const StyledSvg = glamorous.svg(props => ({
  fill: props.color,
  ':hover': {
    fill: props.backgroundColor,
  },
}))

class VolumeUpIcon extends PureComponent {
  render() {
    return (
      <StyledSvg
        backgroundColor={this.props.backgroundColor}
        color={this.props.color}
        height={this.props.size}
        viewBox='0 0 24 24'
        width={this.props.size}
      >
        <path d='M18.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM5 9v6h4l5 5V4L9 9H5z'/>
        <path fill='none' d='M0 0h24v24H0z'/>
      </StyledSvg>
    )
  }
}

VolumeUpIcon.propTypes = {
  backgroundColor: PropTypes.string,
  color: PropTypes.string,
  size: PropTypes.string,
}

VolumeUpIcon.defaultProps = {
  backgroundColor: 'hsla(0, 0%, 100%, 1)',
  color: 'hsla(0, 0%, 100%, 0.8)',
  size: '1em',
}

export default VolumeUpIcon
