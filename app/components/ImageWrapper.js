import React, { Component } from 'react';
import Radium from 'radium';
import { connect } from 'react-redux';
import Icon from './Icon';
import Atomic from '../lib/Atomic';
import Image from './Image';

const { PropTypes } = React;

const Styles = {
  wrapper: {
    position: 'relative',
    cursor: 'pointer',
  },
  imageWidth: {
    width: '100%',
  },
  iconContainer: {
    textAlign: 'center'
  }
}

const Overlay = new Atomic({
  small: {
    opacity: 1,
    background: 'rgba(255,255,255,0)',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: '150ms ease-in-out',
  },
  medium: {
    opacity: 0,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    ':hover': {
      background: 'rgba(255,255,255,.3)',
      opacity: 1
    }
  },
});

const HeartLockup = new Atomic({
  small: {
    display: 'inline-block',
    verticalAlign: 'middle',
    margin: '10px 5px',
  },
  medium: {
    display: 'block',
  }
});

const Heart = new Atomic({
  small: {
    transition: '150ms ease-in-out',
    opacity: 1,
    height: '30px',
  },
  medium: {
    opacity: 1,
    height: '60px',
    ':hover': {
      height: '60px',
    }
  },
});


const mapStateToProps = (state) => {
  return {
    breakpoint: state.application.breakpoint
  };
}

@connect(mapStateToProps)
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
    if (this.props.onClick) {
      this.props.onClick(this.props.media);
    }
  }

  render() {
    return (
      <div data-name='ImageWrapper' style={[this.props.style, Styles.wrapper]} onClick={this.didClickSelf}>
        <Image style={[Styles.imageWidth]} src={this.props.src}/>
        <div style={[Overlay.calculate(this.props.breakpoint)]}>
          <div style={[Styles.iconContainer]}>
            <div style={[HeartLockup.calculate(this.props.breakpoint)]}>
              <Icon icon={'Heart'} viewbox={'0 0 57.947 57.947'} style={[Heart.calculate(this.props.breakpoint)]} />
            </div>
            <h3 style={[HeartLockup.calculate(this.props.breakpoint)]}>{this.props.bumpCount ? this.props.bumpCount : 'Like'}</h3>
          </div>
        </div>
      </div>
    );
  }
}
