import React, { Component } from 'react';
import Image from './Image.js';

const { PropTypes } = React;

const MULTIPLE = 5;

export default class Gallery extends Component {
  static propTypes = {
    imageUrls: PropTypes.array.isRequired,
  }

  randomNumberFromRange(min, max) {
    return Math.floor(Math.random()*(max-min+1)+min);
  }

  buildPositioningStyles(nudge={}) {

    let Styles = {
      positioning: {
        position: 'relative',
        width: this.randomNumberFromRange(50, 100) + '%',
      }
    }
    return Object.assign(Styles.positioning, nudge);
  }

  nudge(index) {
    if (index % MULTIPLE === 0 || (index+1) % MULTIPLE === 0) {
      return {right: '20%'};
    } else if ((index+3) % MULTIPLE === 0 || (index+4) % MULTIPLE === 0) {
      return {left: '20%'};
    } else {
      return {left: 'auto'};
    }
  }

  render() {
    let images = this.props.imageUrls.map((url, index) => <Image key={index} style={this.buildPositioningStyles(this.nudge(index))} src={url} />);
    return (<div>{images}</div>);
  }
}
