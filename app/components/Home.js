import React, { Component } from 'react';
import Radium from 'radium';
import Image from './Image.js';

const Styles = {
  base: {
    backgroundColor: 'pink'
  },
  active: {
    backgroundColor: 'blue' 
  }
}

@Radium
export default class Home extends Component {
  render() {
    const {
      reactIsRad 
    } = this.props;

    return (
      <div style={[Styles.base]}>
        <Image src={'https://pbs.twimg.com/media/CeGrzp6WoAAn-jQ.jpg'} />
      </div>
    );
  }
}
