import React, {Component} from 'react'
import styled, {injectGlobal} from 'styled-components'
import reset from 'styled-reset'

import {fonts, media} from '../constants/styles'
import DevTool from './dev/DevTool'

injectGlobal`
  ${reset}
  #root {
    height: 100%;
  }
  html, body {
    height: 100%;
  }
  body {
    margin: 0;
    padding: 0;
    font-family: ${fonts.sansSerif};
    background-color: #f4f4f4;
    font-size: 16px;
    height: 100%;
  }
`

const AppArea = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100%;
  height: 800px;
  background-color: #ddd;
`

const Container = styled.div`
  background-color: white;
  width: 100%;
  min-height: 100%;
  height: 100%;
  flex-grow: 1;
  
  ${media.desktop`
    max-width: 960px;
    margin: 4em auto;
    border-radius: 4px;
    box-shadow: 0px 4px 32px 0px rgba(0,0,0,0.15);
    min-height: auto;
    flex-grow: 0;  
  `}
`

const Header = styled.h1`
  margin: 1rem;
  font-size: 24pt;
`

class App extends Component {
  render() {
    const {view, config} = this.props
    const {isDevelopment} = config
    return (
      <AppArea>
        <Container>
          <Header>Hello,
            React!</Header>
          {isDevelopment && <DevTool view={view}/>}
        </Container>
      </AppArea>
    )
  }
}

export default App
