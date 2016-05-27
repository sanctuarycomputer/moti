import React, { Component } from 'react';
import Radium from 'radium';
import { browserHistory } from 'react-router'

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import StyleableLink from '../components/StyleableLink';
import CurrentUser from '../components/CurrentUser';
import MessageQueue from '../components/MessageQueue';
import Loader from '../components/Loader';

import CoreStyles from '../lib/styles';
import { Status as ApplicationStatusMap } from '../reducers/application';

import Atomic from '../lib/Atomic';


const { 
  colors: { 
    white, 
    grey,
    greyMid
  }
} = CoreStyles;

const AppNavWrapper = new Atomic({
  small: {
    position: 'fixed',
    top: '50%',
    height: '450px',
    display: 'inline-block',
    zIndex: '3',
  },
});

const AppNav = new Atomic({
  small: {
    textAlign: 'center',
    width: '450px',
    position: 'absolute',
    top: '0',
    left: '0',
    transform: 'rotate(-90deg)',
    marginLeft: '-200px',
    color: greyMid,
  },
  medium: {
    marginLeft: '-160px',
  }
});

const AppNavLink = new Atomic({
  defaults: [CoreStyles.linkStyle],
  small: {
    color: greyMid,
    fontSize: '1rem',
    lineHeight: '2rem',
    display: 'inline-block',
    margin: '0 15px',
    cursor: 'pointer',
    ':hover': {
      borderBottomWidth: '2px',
      borderBottomStyle: 'solid',
      borderColor: greyMid
    }
  },
  states: {
    active: {
      borderBottomWidth: '2px',
      borderBottomStyle: 'solid',
      borderColor: greyMid
    },
    inactive: {
      borderBottomWidth: '2px',
      borderBottomStyle: 'solid',
      borderColor: 'transparent',
    }
  }
});

const Status = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
}

const mapStateToProps = (state) => {
  return {
    isLoading: state.application.status === ApplicationStatusMap.LOADING,
    currentUser: state.oAuth.currentUser,
    currentPath: state.routing.locationBeforeTransitions.pathname,
    breakpoint: state.application.breakpoint
  };
};

@connect(mapStateToProps)
@Radium
export default class App extends Component {

  constructor(props) {
    super(...arguments);
    this.state = this.stateForPathname(props.currentPath);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.currentUser && !nextProps.currentUser) { this.userDidLogout(); }
    console.log(nextProps.currentPath);
    this.setState(this.stateForPathname(nextProps.currentPath));
  }

  stateForPathname(pathname) {
    let activeStates = { 
      about: Status.INACTIVE,
      featured: Status.INACTIVE,
      permanent: Status.INACTIVE,
      exit: Status.INACTIVE 
    };
    if (pathname.includes('information')) {
      activeStates['about'] = Status.ACTIVE;
    } else if (pathname.includes('permanent-collection')) {
      activeStates['permanent'] = Status.ACTIVE;
    } else {
      activeStates['featured'] = Status.ACTIVE;
    }
    return activeStates;
  }

  userDidLogout = () => {
    if (this.props.currentPath !== '/') { browserHistory.push('/'); }
  }

  render() {

    return (
      <div>
        <Loader isLoading={this.props.isLoading} breakpoint={this.props.breakpoint} />

        <MessageQueue />

        <div style={AppNavWrapper.calculate(this.props.breakpoint)}>
          <nav style={AppNav.calculate(this.props.breakpoint)}>
            
            <StyleableLink to='/information' style={[
              AppNavLink.calculate(this.props.breakpoint),
              AppNavLink.styles.states[this.state.about],
            ]}>About</StyleableLink>
            
            <StyleableLink to='/' style={[
              AppNavLink.calculate(this.props.breakpoint),
              AppNavLink.styles.states[this.state.featured],
            ]}>Featured Gallery</StyleableLink>
            
            <StyleableLink to='/permanent-collection' style={[
              AppNavLink.calculate(this.props.breakpoint),
              AppNavLink.styles.states[this.state.permanent],
            ]}>Permenant Collection</StyleableLink>
            
            <span style={[
              AppNavLink.calculate(this.props.breakpoint),
              AppNavLink.styles.states[this.state.exit],
            ]}><CurrentUser /></span>
         
          </nav>
        </div>

        <div>{this.props.children}</div>
      </div>
    )
  }
}
