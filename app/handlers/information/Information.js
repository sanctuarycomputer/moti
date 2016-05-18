import React, { Component } from 'react';
import Radium from 'radium';
import StyleableLink from '../../components/StyleableLink';
import { connect } from 'react-redux';
import Atomic from '../../lib/Atomic';

import CoreStyles from '../../lib/styles';
import Copy from '../../lib/copy';
import colors from '../../lib/colors';

const {
  fontSize,
  container
} = CoreStyles;

const InfoNav = new Atomic ({
  small: {
    fontSize: '1rem',
    lineHeight: '1.2rem',
    marginTop: '20px',
    overflow: 'hidden',
    textAlign: 'center',
  },
  medium: {
    marginBottom: '60px',
  },
  states: {
    active: { 
      borderBottomWidth: '3px',
      borderBottomStyle: 'solid',
      borderColor: colors.white 
    },
    inactive: { 
      borderBottomWidth: '3px',
      borderBottomStyle: 'solid',
      borderColor: 'transparent'
    }
  }
})

const NavItem = new Atomic ({
  small: {
    width: '100%',
    padding: 0,
    marginBottom: '20px'
  },
  medium: {
    width: 'auto',
    display: 'inline-block',
    verticalAlign: 'middle',
    padding: '0 30px',
  },
})

const Status = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
}

const mapStateToProps = state => {
  return {
    currentPath: state.routing.locationBeforeTransitions.pathname,
    breakpoint: state.application.breakpoint
  };
}

@connect(mapStateToProps)
@Radium
export default class Information extends Component {

  constructor(props) {
    super(...arguments);
    this.state = this.stateForPathname(props.currentPath);
  }

  componentWillReceiveProps(newProps) {
    this.setState(this.stateForPathname(newProps.currentPath));
  }

  stateForPathname(pathname) {
    let activeStates = { 
      information: Status.INACTIVE,
      past: Status.INACTIVE,
      future: Status.INACTIVE 
    };
    if (pathname.includes('past-curators')) {
      activeStates['past'] = Status.ACTIVE;
    } else if (pathname.includes('future-curators')) {
      activeStates['future'] = Status.ACTIVE;
    } else {
      activeStates['information'] = Status.ACTIVE;
    }
    return activeStates;
  }

  render () {
    return (
      <div style={[CoreStyles.fontStyle, container.calculate(this.props.breakpoint)]}>
        <nav style={[InfoNav.calculate(this.props.breakpoint), fontSize.calculate(this.props.breakpoint)]}>

          <div style={[NavItem.calculate(this.props.breakpoint)]}>
            <StyleableLink to={'/information'} style={[
              CoreStyles.linkStyle,
              InfoNav.styles.states[this.state.information],
            ]}>About</StyleableLink>
          </div>

          <div style={[NavItem.calculate(this.props.breakpoint)]}>          
            <StyleableLink to={'/information/past-curators'} style={[
              CoreStyles.linkStyle,
              InfoNav.styles.states[this.state.past]
            ]}>Past Curators</StyleableLink>
          </div>

          <div style={[NavItem.calculate(this.props.breakpoint)]}>
            <StyleableLink to={'/information/future-curators'} style={[
              CoreStyles.linkStyle,
              InfoNav.styles.states[this.state.future]
            ]}>Future Curators</StyleableLink>
          </div>
          

        </nav>

        {this.props.children}
      </div> 
    ); 
  }
}
