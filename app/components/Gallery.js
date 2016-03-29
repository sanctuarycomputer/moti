import React, { Component } from 'react';
const { PropTypes } = React;

import Image from './Image.js';

export default class Gallery extends Component {
  static propTypes = {
    imageUrls: PropTypes.array.isRequired,
  }

  render() {
    let images = this.props.imageUrls.map((url, index) => <Image key={index} src={url} />);
    return (<div>{images}</div>);
  }
}
