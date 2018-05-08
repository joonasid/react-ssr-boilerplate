import React, {Component} from 'react'
import styled from 'styled-components'

const getWindowDimensions = () => {
  if (typeof window !== 'undefined') {
    return {
      width: window.innerWidth,
      height: window.innerHeight
    }
  } else {
    return {
      width: 0,
      height: 0
    }
  }
}

const DevToolWrapper = styled.div`
    position: fixed;
    bottom: 4px;
    left: 4px;
    font-size: 9pt;
    line-height: 12px;
    background-color: #D7CCC8;
    border: 1px solid #4E342E;
    box-shadow: 1px 1px 6px 0px #4E342E;
    padding: 2px 4px;
    z-index: 10001;
`

class DevTool extends Component {
  constructor(props) {
    super(props)
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', this.onResize)
    }
    this.state = {
      window: getWindowDimensions()
    }
  }
  
  onResize = () => {
    this.setState((state) => ({
      ...state,
      window: getWindowDimensions()
    }))
  }
  
  render = () => {
    const {view: {deviceType}} = this.props
    const {window: {width, height}} = this.state
    return (
      <DevToolWrapper>
        Foo:&nbsp;
        {deviceType}&nbsp;
        ({width} x {height} px)
      </DevToolWrapper>
    )
  }
  
}

export default DevTool
