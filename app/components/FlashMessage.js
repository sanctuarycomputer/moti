import React, { Component } from 'react';
import Radium from 'radium';

const Styles = {
  flashContainer: {
    padding: '0.2rem',
    textAlign: 'center'
  },
  containerColor: {
    success: {
      backgroundColor: 'rgba(37, 37, 37, 0.9)'
    },
    error: {
      backgroundColor: 'rgba(37, 37, 37, 0.9)'
    },
    info: {
      backgroundColor: 'rgba(37, 37, 37, 0.9)'
    },
    warning: {
      backgroundColor: 'rgba(37, 37, 37, 0.9)'
    }
  },
  messageText: {
    fontSize: '15px',
    color: 'white',
    lineHeight: '1.5rem',
    margin: '14px',
    fontWeight: 400,
    letterSpacing: '1px'
  }
};

@Radium
export default class FlashMessage extends Component {

  render() {
    return (
      <div style={[Styles.flashContainer, Styles.containerColor[this.props.status]]}>
        <p style={[Styles.messageText]}>{this.props.text}</p>
      </div>
    );
  }
}