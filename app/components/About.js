import React, { Component } from 'react';
import Radium from 'radium';

import Copy from '../lib/copy';

const Styles = { 
  base: { 
    marginTop: 0,
    letterSpacing: '1px',
    fontSize: '3rem',
    lineHeight: '4.5rem',
    fontFamily: 'Helvetica Neue'
  }
};

@Radium
export default class About extends Component {
  render() { 
    return (<p style={[Styles.base]}>{Copy.lorem}</p>); 
  }
}
