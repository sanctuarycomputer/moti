import React, { Component } from 'react';
const { PropTypes } = React;

import Image from './Image';

export default class ImageWrapper extends Component {
  static propTypes = {
    src: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    media: PropTypes.object
  }

  didClickSelf = () => {
    if (this.props.onClick) { this.props.onClick(this.props.media); }
  }

  render() {
    return (
      <div onClick={this.didClickSelf}>
        <Image src={this.props.src} />
      </div>
    );
  }
}
