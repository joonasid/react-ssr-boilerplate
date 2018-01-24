import React, { Component } from 'react'
import styled, { injectGlobal } from 'styled-components'
import reset from 'styled-reset'

import { fonts, media } from '../constants/styles'

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
  }
`

const AppArea = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100%;
  background-color: #ddd;
`

const Container = styled.div`
  background-color: white;
  width: 100%;
  min-height: 100%;
  padding-bottom: 1em;
  flex-grow: 1;
  
  ${media.desktop`
    max-width: 800px;
    margin: 4em auto;
    border-radius: 4px;
    padding: 2em 2em 3em 2em;
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
  render () {
    return (
      <AppArea>
        <Container>
          <Header>Hello, React SSR!</Header>
        </Container>
      </AppArea>
    )
  }
}

export default App
