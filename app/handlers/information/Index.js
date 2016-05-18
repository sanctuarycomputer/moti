import React, { Component } from 'react';
import Radium from 'radium';
import { connect } from 'react-redux';

import CoreStyles from '../../lib/styles';
import Copy from '../../lib/copy';

const {
  fontSize
} = CoreStyles;

const mapStateToProps = state => {
  return {
    breakpoint: state.application.breakpoint
  };
}

@connect(mapStateToProps)
@Radium
export default class About extends Component {
  render () {
    return (
      <p style={[fontSize.calculate(this.props.breakpoint)]}>{Copy.lorem}</p>
    ); 
  }
};


