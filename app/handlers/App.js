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

const AppNav = new Atomic({
  small: {
    position: 'fixed',
    top: '50%',
    left: '0',
    transform: 'translateX(-36%) rotate(-90deg)',
    minWidth: '405px'
  },
  medium: {
    backgroundColor: 'red'
  },
  large: {
    backgroundColor: 'blue'
  },
  states: {
    foo: { backgroundColor: 'pink' },
    bar: { backgroundColor: 'yellow' }
  }
});

const AppNavLink = new Atomic({
  defaults: [CoreStyles.linkStyle],
  small: {
    color: greyMid,
    fontSize: '1rem',
    lineHeight: '2rem',
    display: 'inline-block',
    margin: '0 15px'
  }
});

const mapStateToProps = (state) => {
  return {
    isLoading: state.application.status === ApplicationStatusMap.LOADING,
    currentUser: state.oAuth.currentUser,
    currentPath: state.routing.locationBeforeTransitions.pathname,
    breakpoint: state.application.breakpoint
  };
}

@connect(mapStateToProps)
@Radium
export default class App extends Component {

  constructor(props) {
    super(...arguments);
    this.state = {
      hello: 'bar'
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.currentUser && !nextProps.currentUser) { this.userDidLogout(); }
  }

  userDidLogout = () => {
    if (this.props.currentPath !== '/') { browserHistory.push('/'); }
  }

  render() {

    return (
      <div>
        <Loader isLoading={this.props.isLoading} />

        <CurrentUser />

        <nav style={AppNav.calculate(this.props.breakpoint)}>
          <StyleableLink to='/information' style={AppNavLink.calculate(this.props.breakpoint)}>About</StyleableLink>

          <StyleableLink to='/' style={AppNavLink.calculate(this.props.breakpoint)}>Featured Gallery</StyleableLink>

          <StyleableLink to='/permanent-collection' style={AppNavLink.calculate(this.props.breakpoint)}>Permenant Collection</StyleableLink>
        </nav>

        <div>{this.props.children}</div>
      </div>
    )
  }
}
