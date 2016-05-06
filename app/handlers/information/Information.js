import React, { Component } from 'react';
import Radium from 'radium';
import StyleableLink from '../../components/StyleableLink';

import CoreStyles from '../../lib/styles';
import Copy from '../../lib/copy';

const Styles = {
  nav: {
    marginBottom: '60px'  
  },
  navLink: {
    marginRight: '30px',
  }
}

export default Radium(props => {
  return (
    <div style={[CoreStyles.fontStyle]}>
      <nav style={[Styles.nav]}>

        <StyleableLink to={'/information'} style={[
          Styles.navLink,
          CoreStyles.linkStyle
        ]}>About</StyleableLink>

        <StyleableLink to={'/information/past'} style={[
          Styles.navLink,
          CoreStyles.linkStyle
        ]}>Past</StyleableLink>

        <StyleableLink to={'/information/future'} style={[
          Styles.navLink,
          CoreStyles.linkStyle
        ]}>Future</StyleableLink>

      </nav>

      {props.children}
    </div> 
  ); 
});
