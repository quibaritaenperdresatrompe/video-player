import glamorous from 'glamorous'
import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'

const StyledSvg = glamorous.svg(props => ({
  fill: props.color,
  ':hover': {
    fill: props.backgroundColor,
  },
}))

class PauseIcon extends PureComponent {
  render() {
    return (
      <StyledSvg
        backgroundColor={this.props.backgroundColor}
        color={this.props.color}
        height={this.props.size}
        viewBox='0 0 24 24'
        width={this.props.size}
      >
        <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
        <path fill="none" d="M0 0h24v24H0z"/>
      </StyledSvg>
    )
  }
}

PauseIcon.propTypes = {
  backgroundColor: PropTypes.string,
  color: PropTypes.string,
  size: PropTypes.string,
}

PauseIcon.defaultProps = {
  backgroundColor: 'hsla(0, 0%, 100%, 1)',
  color: 'hsla(0, 0%, 100%, 0.8)',
  size: '1em',
}

export default PauseIcon
