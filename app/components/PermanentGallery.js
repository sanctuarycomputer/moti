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

  // didClickImageWrapper = (media) => {
  //   // Check if media id is in permanents
  //   let permanentsRef = this.props.firebaseRef.child('/permanents');

  //   let match = this.props.collection.find(permanentMedia => permanentMedia.media.id === media.id);

  //   if(match) {

  //   } else {
  //     let newPermanent = permanentsRef.push();
  //     newPermanent.set({
  //       media,
  //       bumpCount: 1
  //     });
  //   }
  // }

//   render() {
//     let images = this.props.collection.map((photo, index) => {
//       return (
//         <img key={index} src={photo.media.images.standard_resolution.url} />
//         )
//       }
//     )
//     return (<div>{images}</div>);
//   }
// }


  render() {
    let images = this.props.collection.map((photo, index) => {
      return (
        <ImageWrapper key={index} 
                      src={photo.media.images.standard_resolution.url} 
                      onClick={this.didClickImageWrapper} 
                      media={photo}/>
      )
    });
    return (<div style={Styles.wrapper}>{images}</div>);
  }
}