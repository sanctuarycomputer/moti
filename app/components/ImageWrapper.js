import React, { Component } from 'react';
import Radium from 'radium';
const { PropTypes } = React;

import Image from './Image';

const Styles = {
  wrapperPosition: {
    position: 'relative'
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0,
    cursor: 'pointer',
    transition: 'opacity 250ms ease-in-out',
    ':hover': {
      opacity: .3,
      backgroundColor: 'black',
    }
  }
}

@Radium
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
      <div style={Styles.wrapperPosition}>
        <div onClick={this.didClickSelf}>
          <Image src={this.props.src} />
        </div>
        <div style={[Styles.overlay]}>overlay</div>
      </div>
    );
  }
}
