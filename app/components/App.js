import React, { Component } from 'react';
import Radium from 'radium';

const Styles = {
  base: {
    width: '80vw',
    marginLeft: '10vw',
    height: '100vh',
    overflow: 'scroll'
  }
}

@Radium
export default class App extends Component {
  render() {
    let mainStyle = {
      color: 'white',
      fontSize: 100,
    };

    let topRight = {
      top: 0,
      right: 0,
      position: 'fixed'
    };

    let bottomLeft = {
      bottom: 0,
      left: 0,
      position: 'fixed'
    };

    let bottomRight = {
      bottom: 0,
      right: 0,
      position: 'fixed'
    }

    return (
      <div style={mainStyle}>
        <div>M</div>
        <div style={topRight}>O</div>
        <div style={bottomLeft}>T</div>
        <div style={bottomRight}>I</div>

        <div style={[Styles.base]}>{this.props.children}</div>
      </div>
    )
  }
}
