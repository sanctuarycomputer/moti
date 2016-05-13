import React, { Component } from 'react';
import Radium from 'radium';
import Icon from './Icon';
const { PropTypes } = React;

import Image from './Image';

const Styles = {
  wrapperPosition: {
    position: 'relative'
  },
  overlay: {
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
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
  },
  heart: {
    transition: '200ms ease-in-out',
    ':hover': {
      height: '60px',
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
        <div style={[Styles.overlay]}>
          <div style={[Styles.iconContainer]}>
            <div onClick={this.didClickSelf}>
              <Icon icon={'Heart'} height={50} viewbox={'0 0 57.947 57.947'} style={[Styles.heart]}/>
            </div>
            <h3>bump count</h3>
          </div>
        </div>
      </div>
    );
  }
}
