import React, { Component } from 'react';
import Radium from 'radium';

import Login from '../components/Login';
import Gallery from '../components/Gallery';
import CurrentCurator from '../components/currentCurator';
import { connect } from 'react-redux';

import CoreStyles from '../lib/styles';

const Styles = {
  wrapper: {
    background: [
      'rgba(0,0,0,1)', 
      '-moz-linear-gradient(top, rgba(0,0,0,1) 0%, rgba(64,64,65,1) 52%, rgba(0,0,0,1) 100%)', 
      '-webkit-gradient(left top, left bottom, color-stop(0%, rgba(0,0,0,1)), color-stop(52%, rgba(64,64,65,1)), color-stop(100%, rgba(0,0,0,1)))', 
      '-webkit-linear-gradient(top, rgba(0,0,0,1) 0%, rgba(64,64,65,1) 52%, rgba(0,0,0,1) 100%)', 
      '-o-linear-gradient(top, rgba(0,0,0,1) 0%, rgba(64,64,65,1) 52%, rgba(0,0,0,1) 100%)', 
      '-ms-linear-gradient(top, rgba(0,0,0,1) 0%, rgba(64,64,65,1) 52%, rgba(0,0,0,1) 100%)', 
      'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(64,64,65,1) 52%, rgba(0,0,0,1) 100%)'
    ]
  }
}

const { 
  container
} = CoreStyles;

const mapStateToProps = (state) => {
  return { 
    applicationStatus: state.application.status,
    currentUser: state.oAuth.currentUser,
    currentCurator: state.curator.currentCurator,
    breakpoint: state.application.breakpoint
  };
}

@connect(mapStateToProps)
@Radium
export default class Home extends Component {
  render() {
    if (this.props.currentUser) { 
      return (
        <div style={[Styles.wrapper]}>
          <div style={[container.calculate(this.props.breakpoint)]}>
            <Gallery imageUrls={this.props.images} />
            <CurrentCurator currentCurator={this.props.currentCurator} />
          </div>
        </div>
      ); 
    }
    return (<Login />);
  }
}
