import React, { Component } from 'react';

import Login from '../components/Login';
import Gallery from '../components/Gallery';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  return { 
    applicationStatus: state.application.status,
    currentUser: state.oAuth.currentUser,
    images: state.gallery.photos.map(photo => photo.images.standard_resolution.url)
  };
}

export default connect(mapStateToProps)(props => {
  if (props.applicationStatus === 'error') { return (<h1>Error has occured</h1>); }
  if (props.currentUser) { return (<Gallery imageUrls={props.images} />); }
  return (<Login />);
});
