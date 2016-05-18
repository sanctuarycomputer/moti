import React, { Component } from 'react';
import ImageWrapper from './ImageWrapper';
import { connect } from 'react-redux';
import Atomic from '../lib/Atomic';
import Masonry from 'react-masonry-component';

const { PropTypes } = React;

const ItemWidth = new Atomic({
  small: {
    width: 'calc(100% - 10px)',
    marginBottom: '50px'
  },
  medium: {
    width: 'calc(50% - 10px)',
    marginBottom: '10px'
  },
  large: {
    width: 'calc(25% - 10px)',
    marginBottom: '10px'
  }
});

const Styles = {
  wrapper: {
    width: '80vw',
    margin: '0 auto',
    padding: '20px 20px 0',
    textAlign: 'center',
  }
}

let masonryOptions = {
  transitionDuration: '1s',
  gutter: 10
};

const mapStateToProps = (state) => {
  return { 
    firebaseRef: state.application.firebaseRef,
    collection: state.gallery.collection.slice(0),
    breakpoint: state.application.breakpoint
  };
}

@connect(mapStateToProps)
export default class PermanentGallery extends Component {

  didBumpImage = (media) => {
    let imageRef = this.props.firebaseRef.child('/permanents/' + media.id + '/bumpCount');

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
                      style={ItemWidth.calculate(this.props.breakpoint)} />
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