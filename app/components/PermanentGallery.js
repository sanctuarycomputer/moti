import React, { Component } from 'react';
import { hasherize } from '../lib/utils';
import ImageWrapper from './ImageWrapper';
import { connect } from 'react-redux';
import Atomic from '../lib/Atomic';
import Masonry from 'react-masonry-component';
import { manageBumpCount } from '../lib/helpers';

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
    breakpoint: state.application.breakpoint,
    currentUser: state.oAuth.currentUser
  };
}

@connect(mapStateToProps)
export default class PermanentGallery extends Component {

  didBumpImage = (media) => {
    let imageRef = this.props.firebaseRef.child('/permanents/' + media.id );
    let imageBumpCountRef = this.props.firebaseRef.child('/permanents/' + media.id + '/bumpCount');
    let currentUser = this.props.currentUser;

    manageBumpCount(currentUser, media, imageRef, imageBumpCountRef);
  }

  render() {

    let images = this.props.collection.map((photo, index) => {
      return (
        <ImageWrapper key={index}
                      src={photo.media.link}
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
