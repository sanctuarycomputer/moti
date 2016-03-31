import React, { Component } from 'react';
import Radium from 'radium';

import CoreStyles from '../../lib/styles';
import Copy from '../../lib/copy';

@Radium
export default class AboutDetail extends Component {
  render() { 
    return (<p style={[CoreStyles.fontStyle]}>{Copy.lorem}</p>); 
  }
}
