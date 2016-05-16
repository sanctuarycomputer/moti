import React, { Component } from 'react';
import Radium from 'radium';
import months from '../lib/months';
import styles from '../lib/styles';
import CoreStyles from '../lib/styles';

const { PropTypes } = React;

const {
  fontStyle
} = styles;

const { 
  colors: {
    greyMid
  }
} = CoreStyles;

const Styles = {
  curatorWrapper: {
    display: 'inline-block',
    height: '400px',
    position: 'fixed',
    right: '50px',
    top: '50%',
    transform: 'translateY(-50%)'
  },
  curatorString: {
    textAlign: 'center',
    width: '400px',
    position: 'absolute',
    top: '0',
    left: '0',
    transform: 'rotate(90deg)',
    transformOrigin: 'top left',
    color: greyMid
  },
  month: {
    marginRight: '.5rem'
  },
  name: {
    marginLeft: '.5rem'
  }
}

export default class CurrentCurator extends Component {
  static propTypes = {
    currentCurator: PropTypes.object
  }

  render() {
    if (this.props.currentCurator.isDummy) { return null; }

    const {
      name,
      date: { month }
    } = this.props.currentCurator;

    let monthString = months[month];

    return(
      <div style={Styles.curatorWrapper}>
        <div style={Styles.curatorString}>
          <span style={Styles.month}>{monthString}</span>|<span style={Styles.name}>{name}</span>
        </div>
      </div>
    )
  }
}