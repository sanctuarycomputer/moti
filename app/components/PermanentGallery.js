import React, { Component } from 'react';

const { PropTypes } = React;

import ImageWrapper from './ImageWrapper';
import { connect } from 'react-redux';

const Styles = {
  wrapper: {
    width: '80vw',
    margin: '0 auto',
    columnCount: 3,
    columnGap: '0px',
    padding: '20px 20px 0',
    textAlign: 'center',
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

  orderImagesForFlexbox(images) {
    
    let columns = [[],[],[]];
    let currentColumn = 0;

    while (images.length) {
      columns[currentColumn].push(images.shift());
      if (currentColumn === columns.length - 1) {
        currentColumn = 0; 
      } else {
        currentColumn++;
      }
    }

    console.log(columns);

    columns.forEach(column => {
      let finalColumn = columns[columns.length - 1];
      if (column.length > finalColumn.length) {
        
      }
    });

    return images;
  }

  render() {
    let images = this.orderImagesForFlexbox(this.props.collection).map((photo, index) => {
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