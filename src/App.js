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

const PlayerContainer = glamorous.div({
  alignItems: 'center',
  display: 'flex',
  flexGrow: 1,
  justifyContent: 'center',
  padding: '2em',
})

export default class App extends Component {
  render() {
    return (
      <StyledApp>
        <PlayerContainer>
          <Player
            currentSource='https://s3-eu-west-1.amazonaws.com/onrewind-test-bucket/big_buck_bunny.mp4' />
        </PlayerContainer>
      </StyledApp>
    )
  }
}
