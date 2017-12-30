import glamorous from 'glamorous'
import React, { Component } from 'react'

import Player from './containers/Player'

import './App.scss'

const StyledApp = glamorous.div({
  height: '100vh',
  display: 'flex',
  alignItems: 'center',
  position: 'relative',
})

const MediumContainer = glamorous.div({
  alignItems: 'center',
  display: 'flex',
  flexGrow: 1,
  justifyContent: 'center',
  padding: '2em',
})

export default class App extends Component {
  constructor() {
    super()
    this.state = {
      media: [
        {
          title: 'Big Buck Bunny',
          source: 'https://s3-eu-west-1.amazonaws.com/onrewind-test-bucket/big_buck_bunny.mp4',
        },
      ],
      currentMedium: 0,
    }
  }

  renderPlayer = () => {
    const mediumToRead = this.state.media && this.state.media[this.state.currentMedium]
    if (mediumToRead && mediumToRead.source) {
      return (
        <MediumContainer>
          <Player medium={mediumToRead} />
        </MediumContainer>
      )
    }
    return null
  }

  render() {
    return (
      <StyledApp>
        {this.renderPlayer()}
      </StyledApp>
    )
  }
}
