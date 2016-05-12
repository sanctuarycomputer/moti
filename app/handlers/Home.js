import React, { Component } from 'react';

import Login from '../components/Login';
import Gallery from '../components/Gallery';
import CurrentCurator from '../components/currentCurator';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  return { 
    applicationStatus: state.application.status,
    currentUser: state.oAuth.currentUser,
    currentCurator: state.curator.currentCurator,
  };
}

export default connect(mapStateToProps)(props => {
  if (props.currentUser) { 
    return (
      <div>
        <Gallery />,
        <CurrentCurator currentCurator={props.currentCurator} />
      </div>
    ); 
  }
  return (<Login />);
});
