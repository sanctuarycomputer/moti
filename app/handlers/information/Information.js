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

export default Radium(props => {
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

      {props.children}
    </div> 
  ); 
});
