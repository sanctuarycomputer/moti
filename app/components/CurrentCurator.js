import React, { Component } from 'react';
import Radium from 'radium';
import months from '../lib/months';
import colors from '../lib/colors';
import styles from '../lib/styles';
const { PropTypes } = React;

const {
  white
} = colors;

const {
  fontStyle
} = styles;

const Styles = {
  curatorAttribution: {
    position: 'fixed',
    top: '50%',
    right: 0,
    transform: 'rotate(90deg)',
    fontFamily: 'Helvetica Neue',
    color: white,
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
      <div style={Styles.curatorAttribution}><span style={Styles.month}>{monthString}</span>|<span style={Styles.name}>{name}</span>
      </div>
    )
  }
}