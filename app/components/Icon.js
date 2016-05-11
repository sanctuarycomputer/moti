import React, { Component, PropTypes } from 'react';
import Radium from 'radium';
import Svgs from '../lib/svgs';

@Radium
export default class Icon extends Component {
  static propTypes = {
    icon:    PropTypes.string.isRequired,
    viewbox: PropTypes.string.isRequired,
    width:   PropTypes.number,
    height:  PropTypes.number,
    style:   PropTypes.array,
    fill:    PropTypes.string
  }

  render() {
    return (
      <svg viewBox={this.props.viewbox} 
           width={this.props.width} 
           height={this.props.height} 
           style={this.props.style}
           fill={this.props.fill}
           xmlns="http://www.w3.org/2000/svg">
        {Svgs[this.props.icon]}
      </svg>
    );
  }
}
