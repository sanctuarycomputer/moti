import React, { Component } from 'react';
import Radium from 'radium';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import StyleableLink from '../components/StyleableLink';
import CoreStyles from '../lib/styles';

const Styles = {
  base: {
    width: '80vw',
    marginLeft: '10vw',
    height: '100vh',
    overflow: 'scroll'
  },
  appNavLink: {
    position: 'fixed',
    top: '50%',
    transform: 'translateY(-50%) rotate(-90deg)'
  }
}

function mapStateToProps(state, ownProps) {
  return {
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
  
  render() {
    let mainStyle = {
      color: 'white',
      fontSize: 100,
    };

    let topRight = {
      top: 0,
      right: 0,
      position: 'fixed'
    };

    let bottomLeft = {
      bottom: 0,
      left: 0,
      position: 'fixed'
    };

    let bottomRight = {
      bottom: 0,
      right: 0,
      position: 'fixed'
    }
    
    let appNavLinkInfo = this.appNavLinkForCurrentPath(this.props.currentPath);

    return (
      <div style={mainStyle}>
        <div>M</div>
        <div style={topRight}>O</div>
        <div style={bottomLeft}>T</div>
        <div style={bottomRight}>I</div>
        
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
