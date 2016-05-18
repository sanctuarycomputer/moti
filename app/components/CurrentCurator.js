import React, { Component } from 'react';
import Radium from 'radium';
import { connect } from 'react-redux';
import months from '../lib/months';
import styles from '../lib/styles';
import CoreStyles from '../lib/styles';
import Atomic from '../lib/Atomic';

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

const WrapperPosition = new Atomic({
  small: {
    right: '15px',
  }, 
  medium: {
    right: '50px',
  }
});

const mapStateToProps = (state) => {
  return {
    breakpoint: state.application.breakpoint
  };
}

@connect(mapStateToProps)
@Radium
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
      <div style={[Styles.curatorWrapper, WrapperPosition.calculate(this.props.breakpoint)]}>
        <div style={Styles.curatorString}>
          <span style={Styles.month}>{monthString}</span>|<span style={Styles.name}>{name}</span>
        </div>
      </div>
    )
  }
}