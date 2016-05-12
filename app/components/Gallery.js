import React, { Component } from 'react';

const { PropTypes } = React;

import ImageWrapper from './ImageWrapper';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  return { 
    photos: state.gallery.photos.slice(0),
    firebaseRef: state.application.firebaseRef,
    collection: state.gallery.collection.slice(0)
  };
}

@connect(mapStateToProps)
export default class Gallery extends Component {

  didClickImageWrapper = (media) => {
    // Check if media id is in permanents
    let permanentsRef = this.props.firebaseRef.child('/permanents');

    let match = this.props.collection.find(permanentMedia => permanentMedia.media.id === media.id);

    if(match) {

    } else {
      let newPermanent = permanentsRef.push();
      newPermanent.set({
        media,
        bumpCount: 1
      });
    }
  }

  render() {
    let images = this.props.photos.map((photo, index) => {
      return (
        <ImageWrapper key={index} 
                      src={photo.images.standard_resolution.url} 
                      onClick={this.didClickImageWrapper} 
                      media={photo} />
      )
    });
    return (<div>{images}</div>);
  }
}
