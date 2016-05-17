import React, { Component } from 'react';
const { PropTypes } = React;
import Radium from 'radium';

import Icon from '../components/Icon';
import CoreStyles from '../lib/styles';

const LOADER_SPEED_MS = 1500;

const { 
  colors: { 
    white, 
    black 
  }
} = CoreStyles;

const DefaultPositions = {
  topLeft: {
    transform: 'translate(-180%, -50%)',
    top: '50%',
    left: '50%'
  },
  topRight: {
    transform: 'translate(-85%, -50%)',
    top: '50%',
    left: '50%'
  },
  bottomLeft: {
    transform: 'translate(35%, -50%)',
    top: '50%',
    left: '50%'
  },
  bottomRight: {
    transform: 'translate(155%, -50%)',
    top: '50%',
    left: '50%'
  }  
}

const Positions = {
  topLeft: {
    transform: 'translate(0%, 0%)',
    top: '2%',
    left: '2%',
  },
  topRight: {
    transform: 'translate(-100%, 0%)',
    left: '98%',
    top: '2%',
    right: '2%',
  },
  bottomLeft: {
    transform: 'translate(0%, -100%)',
    top: '98%',
    bottom: '2%',
    left: '2%',
  },
  bottomRight: {
    transform: 'translate(-100%, -100%)',
    top: '98%',
    left: '98%',
    bottom: '2%',
    right: '2%',
  }  
}

const IconBase = {
  position: 'fixed',
  transition: `${LOADER_SPEED_MS}ms ease-in-out`
}

const Wrapper = {
  height: '100vh',
  width: '100vw',
  backgroundColor: black,
  position: 'fixed',
  top: 0,
  left: 0,
  zIndex: 1,
  transition: `background-color ${LOADER_SPEED_MS}ms ease-in-out`
}

const WrapperLoaded = {
  backgroundColor: 'transparent',
  pointerEvents: 'none',
  transition: `background-color ${LOADER_SPEED_MS}ms ease-in-out ${LOADER_SPEED_MS/2}ms`
}

@Radium
export default class Loader extends Component {
  static propTypes = {
    isLoading: PropTypes.bool.isRequired,
    breakpoint: PropTypes.string
  }

  stylesForIcon(position, isLoading) {
    if (isLoading) {
      return [IconBase, DefaultPositions[position]];
    }
    return [IconBase, Positions[position]];
  }

  render() {
    let iconState = this.props.isLoading ? DefaultPositions : Positions;
    let wrapperStyle = this.props.isLoading ? [Wrapper] : [Wrapper, WrapperLoaded];
    let modularHeight = this.props.breakpoint === 'small' ? 50 : 100;

    return (
      <div style={wrapperStyle}>
        <Icon icon={'M'} height={modularHeight} fill={white} viewbox={'0 0 347 372'} style={[IconBase, iconState.topLeft]} />
        <Icon icon={'O'} height={modularHeight} fill={white} viewbox={'0 0 257 372'} style={[IconBase, iconState.topRight]} />
        <Icon icon={'T'} height={modularHeight} fill={white} viewbox={'0 0 261 372'} style={[IconBase, iconState.bottomLeft]} />
        <Icon icon={'I'} height={modularHeight} fill={white} viewbox={'0 0 258 372'} style={[IconBase, iconState.bottomRight]} />
      </div>
    )
  }
}
