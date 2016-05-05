import React, { Component, PropTypes } from 'react';

export default class Icon extends React.Component {
  renderIcon() {
    switch (this.props.icon) {
      case 'M':
        return (
          <polygon fill={this.props.fill} points="254 0.6 254 32.2 189.8 32.2 189.8 91.2 156.8 91.2 156.8 31.8 93.3 31.8 93.3 0.6 0.5 0.6 0.5 371.8 93.3 371.8 93.3 206.5 120 206.5 120 238.4 226.2 238.4 226.2 206.5 254 206.5 254 371.8 346.8 371.8 346.8 0.6"></polygon>
        );
      case 'O':
        return (
          <path fill={this.props.fill} d="M93,93.5 L164,93.5 L164,278.8 L93,278.8 L93,93.5 L93,93.5 Z M11.4,0.6 L11.4,13 L0.2,13 L0.2,359.6 L10.8,359.6 L10.8,371.7 L245.8,371.7 L245.8,359.6 L256.8,359.6 L256.8,13 L244.7,13 L244.7,0.6 L11.4,0.6 L11.4,0.6 Z"></path>
        );
      case 'T':
        return (
          <polygon fill={this.props.fill} points="0.3 0.8 0.3 93.6 85.6 93.6 85.6 371.2 87.2 371.2 87.2 372 189.3 372 189.3 131.1 178.3 131.1 178.3 93.6 260.2 93.6 260.2 0.8"></polygon>
        );
      case 'I':
        return (
          <polygon fill={this.props.fill} points="0.597683398 0.497326203 0.597683398 92.8010695 85.4687259 92.8010695 85.4687259 106.029947 77.8980695 106.029947 77.8980695 279.397861 6.27567568 279.397861 6.27567568 371.80107 257.501931 371.80107 257.501931 279.397861 178.508108 279.397861 178.508108 106.029947 177.910425 106.029947 177.910425 92.8010695 254.214672 92.8010695 254.214672 0.497326203"></polygon>
        );
    }
  }

  render() {
    return (
      <svg viewBox={this.props.viewbox} 
           width={this.props.width} 
           height={this.props.height} 
           style={this.props.classes}
           xmlns="http://www.w3.org/2000/svg">
        {this.renderIcon()}
      </svg>
    );
  }
}

Icon.propTypes = {
  icon: React.PropTypes.string.isRequired,
  viewbox: React.PropTypes.string.isRequired,
  width: React.PropTypes.number,
  height: React.PropTypes.number,
  classes: React.PropTypes.object,
  fill: React.PropTypes.string
}