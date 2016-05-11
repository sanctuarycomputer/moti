import React, { Component } from 'react';
import Radium from 'radium';
import StyleableLink from '../../components/StyleableLink';

import CoreStyles from '../../lib/styles';
import Copy from '../../lib/copy';

const Styles = {
  nav: {
    marginBottom: '60px',
    display: 'flex',
    justifyContent: 'space-between'  
  }
}

@Radium
export default class Information extends Component {

  setActiveTab(pathname) {
    console.log(pathname);
  }

  render () {
    
    console.log(this.props.location.pathname);

    return (
      <div style={[CoreStyles.fontStyle]}>
        <nav style={[Styles.nav]}>

          <StyleableLink to={'/information'} style={[
            CoreStyles.linkStyle
          ]}>About</StyleableLink>

          <StyleableLink to={'/information/past-curators'} style={[
            CoreStyles.linkStyle
          ]}>Past Curators</StyleableLink>

          <StyleableLink to={'/information/future-curators'} style={[
            CoreStyles.linkStyle
          ]}>Future Curators</StyleableLink>

        </nav>

        {this.props.children}
      </div> 
    ); 
  }
}
