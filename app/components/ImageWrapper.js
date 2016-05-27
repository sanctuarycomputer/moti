import React, { Component } from 'react';
import Radium from 'radium';
import { connect } from 'react-redux';
import Icon from './Icon';
import Atomic from '../lib/Atomic';
import CoreStyles from '../lib/styles';
import Image from './Image';

const { PropTypes } = React;

const { 
  colors: {
    red
  }
} = CoreStyles;

const Styles = {
  wrapper: {
    position: 'relative',
    display: 'block',
    textAlign: 'center'
  },
  imageWidth: {
    maxWidth: '100%',
  },
  imageContainer: {
    cursor: 'pointer',
    display: 'inline-block',
    position: 'relative',
    verticalAlign: 'top',
  },
  ribbon: {
    color: red,
    bumpCount: {
      textAlign: 'left',
      position: 'relative',
      zIndex: '1',
      margin: '0',
      padding: '10px 15px',
    },
    background: {
      position: 'absolute',
      top: '-1px',
      left: 0,
      transition: '150ms ease-in-out',
      opacity: 1,
    }
  }
}

const Overlay = new Atomic({
  small: {
    background: 'rgba(255,255,255,0)',
    opacity: 0,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    transition: '150ms ease-in-out',
    ':hover': {
      background: 'rgba(255,255,255,.3)',
      opacity: 1
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
    bumpCount: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.number
    ]),
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
        <div style={[Styles.imageContainer]}>
          <Image style={[Styles.imageWidth]} src={this.props.src}/>
          <div style={[Overlay.calculate(this.props.breakpoint)]}>
            <Icon icon={'Triangle'} viewbox={'0 0 133 133'} fill={Styles.ribbon.color} width={75} style={[Styles.ribbon.background]} />
            <h3 style={[Styles.ribbon.bumpCount]}>{this.props.bumpCount}</h3>
          </div>
        </div>
      </div>
    );
  }
}
