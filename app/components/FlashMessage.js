import React, { Component } from 'react';
import Radium from 'radium';

const Styles = {
  flashContainer: {
    padding: '1rem',
    textAlign: 'center'
  },
  containerColor: {
    success: {
      backgroundColor: '#00FF19'
    },
    error: {
      backgroundColor: '#FF3030'
    },
    info: {
      backgroundColor: '#00FFE9'
    },
    warning: {
      backgroundColor: '#F6FF00'
    }
  },
  messageText: {
    fontSize: '18px',
    color: 'black'
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