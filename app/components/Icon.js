import React, { Component, PropTypes } from 'react';
import Svgs from '../lib/svgs';

export default class Icon extends Component {

  static propTypes = {
    icon: PropTypes.string.isRequired,
    viewbox: PropTypes.string.isRequired,
    width: PropTypes.number,
    height: PropTypes.number,
    classes: PropTypes.object,
    fill: PropTypes.string
  }

  render() {

    console.log(this.props.styles);

    return (
      <svg viewBox={this.props.viewbox} 
           width={this.props.width} 
           height={this.props.height} 
           style={this.props.classes}
           fill={this.props.fill}
           xmlns="http://www.w3.org/2000/svg">
        {Svgs[this.props.icon]}
      </svg>
    );
  }
}