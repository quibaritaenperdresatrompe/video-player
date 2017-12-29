import glamorous from 'glamorous'
import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'

const StyledIcon = glamorous.svg(props => ({
  fill: props.color,
  ':hover': {
    fill: props.hoverColor || props.color,
  },
}))

const ICON_PATHS = {
  PauseIcon: 'M6 19h4V5H6v14zm8-14v14h4V5h-4z',
  PlayIcon: 'M8 5v14l11-7z',
  ReplayIcon: 'M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z',
  VolumeDownIcon: 'M18.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM5 9v6h4l5 5V4L9 9H5z',
  VolumeOffIcon: 'M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z',
  VolumeUpIcon: 'M18.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM5 9v6h4l5 5V4L9 9H5z',
}

class Icon extends PureComponent {
  getIconPath = () => this.props.iconName && ICON_PATHS[this.props.iconName]

  render() {
    const iconPath = this.getIconPath()
    if (!iconPath) return null
    return (
      <StyledIcon
        backgroundColor={this.props.backgroundColor}
        color={this.props.color}
        height={this.props.size}
        viewBox='0 0 24 24'
        width={this.props.size}
      >
        <path d={iconPath} />
        <path fill='none' d='M0 0h24v24H0z' />
      </StyledIcon>
    )
  }
}

Icon.propTypes = {
  color: PropTypes.string,
  hoverColor: PropTypes.string,
  iconName: PropTypes.string,
  size: PropTypes.string,
}

Icon.defaultProps = {
  color: 'hsla(0, 0%, 100%, 0.8)',
  hoverColor: 'hsla(0, 0%, 100%, 1)',
  iconName: null,
  size: '1em',
}

export default Icon