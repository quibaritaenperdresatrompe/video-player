import glamorous from 'glamorous'
import React, { Component } from 'react'

import Player from './containers/Player'

import './App.scss'

const StyledApp = glamorous.div({
  height: '100vh',
})

const StyledPlayerContainer = glamorous.div({
  alignItems: 'center',
  display: 'flex',
  height: '100vh',
  justifyContent: 'center',
  padding: '1em',
})

export default class App extends Component {
  render() {
    return (
      <StyledApp>
        <StyledPlayerContainer>
          <Player currentSource='https://s3-eu-west-1.amazonaws.com/onrewind-test-bucket/big_buck_bunny.mp4' />
        </StyledPlayerContainer>
      </StyledApp>
    )
  }
}
