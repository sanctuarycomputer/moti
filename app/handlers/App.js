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

const AppNavWrapperShow = new Atomic({
  small: {
    position: 'fixed',
    top: '50%',
    height: '450px',
    display: 'inline-block',
    zIndex: '3',
  },
});

const AppNavWrapperHide = {
  opacity: '0',
  visibiliy: 'hidden'
};

const AppNav = new Atomic({
  small: {
    textAlign: 'center',
    width: '568px',
    position: 'fixed',
    top: '50%',
    left: '0',
    transform: 'rotate(-90deg)',
    marginLeft: '-240px',
    color: greyMid,
    letterSpacing: '2px'
  },
  medium: {
    marginLeft: '-210px',
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
      color: white
    }
  },
  states: {
    active: {
      color: white
    },
    inactive: {
      color: greyMid
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

    let navDisplay = this.props.currentUser ? AppNavWrapperShow : AppNavWrapperHide;

    return (
      <div>
        <Loader isLoading={this.props.isLoading} currentUser={this.props.currentUser} breakpoint={this.props.breakpoint} />

        <MessageQueue />

        <div style={navDisplay}>
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
