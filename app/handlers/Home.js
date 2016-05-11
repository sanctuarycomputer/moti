import React, { Component } from 'react';

import Login from '../components/Login';
import Gallery from '../components/Gallery';
import CurrentCurator from '../components/currentCurator';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  return { 
    currentUser: state.oAuth.currentUser,
    images: state.gallery.photos.map(photo => photo.images.standard_resolution.url),
    currentCurator: state.curator.currentCurator
  };
}

export default connect(mapStateToProps)(props => {
  if (props.currentUser) { 
    return (
      <div>
        <Gallery imageUrls={props.images} />,
        <CurrentCurator currentCurator={props.currentCurator} />
      </div>
    ); 
  }
  return (<Login />);
});
