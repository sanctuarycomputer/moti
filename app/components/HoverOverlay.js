import React, { Component } from 'react';
import Radium from 'radium';
const { PropTypes } = React;

const Styles = {
  hoverStyle: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0,
    cursor: 'pointer',
    transition: 'opacity 250ms ease-in-out',
    ':hover': {
      opacity: .3,
      backgroundColor: 'black',
    }
  }
}

@Radium
export default class HoverOverlay extends Component {

  render() {
    return (
      <div style={[Styles.hoverStyle]}>overlay</div>
    );
  }
}
