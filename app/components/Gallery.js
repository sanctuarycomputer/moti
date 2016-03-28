import React, { Component } from 'react';
const { PropTypes } = React;
import Radium from 'radium';

import Image from './Image.js';

const Styles = {
  base: {
    width: '80vw',
    marginLeft: '10vw',
    height: '100vh',
    overflow: 'scroll'
  }
}

@Radium
export default class Gallery extends Component {
  static propTypes = {
    imageUrls: PropTypes.array.isRequired,
  }

  render() {
    let images = this.props.imageUrls.map((url, index) => <Image key={index} src={url} />);
    return (<div style={[Styles.base]}>{images}</div>);
  }
}
