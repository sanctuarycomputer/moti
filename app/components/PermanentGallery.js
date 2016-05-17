import React, { Component } from 'react';
import ImageWrapper from './ImageWrapper';
import { connect } from 'react-redux';
var Masonry = require('react-masonry-component');

const { PropTypes } = React;

const Styles = {
  wrapper: {
    width: '80vw',
    margin: '0 auto',
    padding: '20px 20px 0',
    textAlign: 'center',
  },
  itemWidth: {
    width: '25%'
  }
}

let masonryOptions = {
  transitionDuration: '1s'
};

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
                      bumpCount={photo.bumpCount}
                      style={Styles.itemWidth} />
      )
    });
    return (
      <div style={Styles.wrapper}>
        <Masonry
          className={'masonry-grid'}
          options={masonryOptions}
          disableImagesLoaded={false}>
          {images}
        </Masonry>
      </div>
    );
  }
}