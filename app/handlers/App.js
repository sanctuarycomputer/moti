import React, { Component } from 'react';
import Radium from 'radium';
 import { browserHistory } from 'react-router'

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import StyleableLink from '../components/StyleableLink';
import CurrentUser from '../components/CurrentUser';
import Icon from '../components/Icon';

import CoreStyles from '../lib/styles';
const { 
  colors: { 
    white, 
    grey 
  }
} = CoreStyles;

const Styles = {
  base: {
    width: '60vw',
    margin: '50px auto 0 auto',
    height: '100vh',
    overflow: 'scroll'
  },
  appNavLink: {
    position: 'fixed',
    top: '50%',
    transform: 'translateY(-50%) rotate(-90deg)',
    color: white
  }
}

const Positions = {
  topLeft: {
    top: 50,
    left: 50,
    position: 'fixed'
  },
  topRight: {
    top: 50,
    right: 50,
    position: 'fixed'
  },
  bottomLeft: {
    bottom: 50,
    left: 50,
    position: 'fixed'
  },
  bottomRight: {
    bottom: 50,
    right: 50,
    position: 'fixed'
  }  
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.oAuth.currentUser,
    currentPath: state.routing.locationBeforeTransitions.pathname
  };
}

@connect(mapStateToProps)
@Radium
export default class App extends Component {

  appNavLinkForCurrentPath(pathname) {
    if (pathname.includes('information'))  {
      return {
        path: '/',
        copy: 'Gallery'
      } 
    }
    return {
      path: '/information',
      copy: 'Information'
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.currentUser && !nextProps.currentUser) { this.userDidLogout(); }
  }

  userDidLogout = () => {
    if (this.props.currentPath !== '/') { browserHistory.push('/'); }
  }
  
  render() {
    
    let appNavLinkInfo = this.appNavLinkForCurrentPath(this.props.currentPath);

    return (
      <div>
        <Icon icon={'M'} height={100} fill={white} viewbox={'0 0 347 372'} classes={Positions.topLeft} />
        <Icon icon={'O'} height={100} fill={white} viewbox={'0 0 257 372'} classes={Positions.topRight} />
        <Icon icon={'T'} height={100} fill={white} viewbox={'0 0 261 372'} classes={Positions.bottomLeft} />
        <Icon icon={'I'} height={100} fill={white} viewbox={'0 0 258 372'} classes={Positions.bottomRight} />

        <CurrentUser />
        
        <StyleableLink to={appNavLinkInfo.path} style={[
          Styles.appNavLink,
          CoreStyles.linkStyle,
          CoreStyles.fontStyle
        ]}>{appNavLinkInfo.copy}</StyleableLink>

        <div style={[Styles.base]}>{this.props.children}</div>
      </div>
    )
  }
}
