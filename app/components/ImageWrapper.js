import React, { Component } from 'react';
import Radium from 'radium';
import Icon from './Icon';
const { PropTypes } = React;

import Image from './Image';

const Styles = {
  wrapper: {
    position: 'relative',
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
    background: 'rgba(255,255,255,0)',
    transition: '150ms ease-in-out',
    ':hover': {
      background: 'rgba(255,255,255,.3)',
      opacity: 1
    }
  },
  imageWidth: {
    width: '100%',
  },
  iconContainer: {
    textAlign: 'center'
  },
  heart: {
    transition: '150ms ease-in-out',
    opacity: .3,
    ':hover': {
      height: '60px',
      opacity: 1
    }
  }
}

@Radium
export default class ImageWrapper extends Component {
  static propTypes = {
    src: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    media: PropTypes.object,
    bumpCount: PropTypes.number,
    style: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object
    ]),
  }

  didClickSelf = () => {
    console.log(this.props);
    if (this.props.onClick) {
      this.props.onClick(this.props.media);
    }
  }

  render() {
    return (
      <div data-name='ImageWrapper' style={[this.props.style, Styles.wrapper]}>
        <Image style={[Styles.imageWidth]} src={this.props.src}/>
        <div style={[Styles.overlay]}>
          <div style={[Styles.iconContainer]}>
            <div onClick={this.didClickSelf}>
              <Icon icon={'Heart'} height={50} viewbox={'0 0 57.947 57.947'} style={[Styles.heart]}/>
            </div>
            <h3>{this.props.bumpCount}</h3>
          </div>
        </div>
      </div>
    );
  }
}
