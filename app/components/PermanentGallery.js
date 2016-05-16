import React, { Component } from 'react';

const { PropTypes } = React;

import ImageWrapper from './ImageWrapper';
import { connect } from 'react-redux';

const Styles = {
  wrapper: {
    width: '60vw',
    margin: '0 auto'
  }
}

const mapStateToProps = (state) => {
  return { 
    firebaseRef: state.application.firebaseRef,
    collection: state.gallery.collection.slice(0)
  };
}

@connect(mapStateToProps)
export default class PermanentGallery extends Component {
  didBumpImage = (media) => {
    let imageRef = this.props.firebaseRef.child('/permanents/' + media.id + '/bumpCount')

    imageRef.transaction(currentBumpCount => currentBumpCount+1 )
  }

  render() {
    let images = this.props.collection.map((photo, index) => {
      return (
        <ImageWrapper key={index} 
                      src={photo.media.images.standard_resolution.url} 
                      onClick={this.didBumpImage} 
                      media={photo}
                      bumpCount={photo.bumpCount}/>
      )
    });
    return (<div style={Styles.wrapper}>{images}</div>);
  }
}