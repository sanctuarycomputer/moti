import React, { Component } from 'react';
import Radium from 'radium';
import StyleableLink from '../../components/StyleableLink';
import { connect } from 'react-redux';

import CoreStyles from '../../lib/styles';
import Copy from '../../lib/copy';
import colors from '../../lib/colors';

const Styles = {
  nav: {
    marginBottom: '60px',
    display: 'flex',
    justifyContent: 'space-between',
  },
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

const Status = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
}

const mapStateToProps = state => {
  return {
    currentPath: state.routing.locationBeforeTransitions.pathname
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
      <div style={[CoreStyles.fontStyle]}>
        <nav style={[Styles.nav]}>

          <StyleableLink to={'/information'} style={[
            CoreStyles.linkStyle,
            Styles[this.state.information]
          ]}>About</StyleableLink>

          <StyleableLink to={'/information/past-curators'} style={[
            CoreStyles.linkStyle,
            Styles[this.state.past]
          ]}>Past Curators</StyleableLink>

          <StyleableLink to={'/information/future-curators'} style={[
            CoreStyles.linkStyle,
            Styles[this.state.future]
          ]}>Future Curators</StyleableLink>

        </nav>

        {this.props.children}
      </div> 
    ); 
  }
}
