import React, { Component } from 'react';
import Radium from 'radium';
import { browserHistory } from 'react-router'

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import StyleableLink from '../components/StyleableLink';
import CurrentUser from '../components/CurrentUser';
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
    marginLeft: '-150px',
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
    borderBottom: '2px solid transparent',
    ':hover': {
      borderBottom: '2px solid rgb(152, 152, 152)',
    }
  }
});

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

  componentWillReceiveProps(nextProps) {
    if (this.props.currentUser && !nextProps.currentUser) { this.userDidLogout(); }
  }

  userDidLogout = () => {
    if (this.props.currentPath !== '/') { browserHistory.push('/'); }
  }

  render() {

    return (
      <div>
        <Loader isLoading={this.props.isLoading} breakpoint={this.props.breakpoint} />

        <div style={AppNavWrapper.calculate(this.props.breakpoint)}>
          <nav style={AppNav.calculate(this.props.breakpoint)}>
            <StyleableLink to='/information' style={AppNavLink.calculate(this.props.breakpoint)}>About</StyleableLink>
            <StyleableLink to='/' style={AppNavLink.calculate(this.props.breakpoint)}>Featured Gallery</StyleableLink>
            <StyleableLink to='/permanent-collection' style={AppNavLink.calculate(this.props.breakpoint)}>Permenant Collection</StyleableLink>
            <span style={AppNavLink.calculate(this.props.breakpoint)}>
              <CurrentUser />
            </span>
          </nav>
        </div>

        <div>{this.props.children}</div>
      </div>
    )
  }
}
