import glamorous from 'glamorous'
import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'

const StyledSvg = glamorous.svg(props => ({
  fill: props.color,
  ':hover': {
    fill: props.backgroundColor,
  },
}))

class ReplayIcon extends PureComponent {
  render() {
    return (
      <StyledSvg
        backgroundColor={this.props.backgroundColor}
        color={this.props.color}
        height={this.props.size}
        viewBox='0 0 24 24'
        width={this.props.size}
      >
        <path fill='none' d='M0 0h24v24H0z'/>
        <path d='M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z'/>
      </StyledSvg>
    )
  }
}

ReplayIcon.propTypes = {
  backgroundColor: PropTypes.string,
  color: PropTypes.string,
  size: PropTypes.string,
}

ReplayIcon.defaultProps = {
  backgroundColor: '#d42929',
  color: '#fff',
  size: '1em',
}

export default ReplayIcon
