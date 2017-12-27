import glamorous from 'glamorous'
import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'

const StyledSvg = glamorous.svg(props => ({
  fill: props.color,
  ':hover': {
    fill: props.backgroundColor,
  },
}))

class PlayIcon extends PureComponent {
  render() {
    return (
      <StyledSvg
        backgroundColor={this.props.backgroundColor}
        color={this.props.color}
        height={this.props.size}
        viewBox='0 0 24 24'
        width={this.props.size}
      >
        <path d='M8 5v14l11-7z'/>
        <path fill='none' d='M0 0h24v24H0z'/>
      </StyledSvg>
    )
  }
}

PlayIcon.propTypes = {
  backgroundColor: PropTypes.string,
  color: PropTypes.string,
  size: PropTypes.string,
}

PlayIcon.defaultProps = {
  backgroundColor: '#d42929',
  color: '#fff',
  size: '1em',
}

export default PlayIcon
