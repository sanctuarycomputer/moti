import React, { Component } from 'react';

const { PropTypes } = React;
const MULTIPLE = 5;

import ImageWrapper from './ImageWrapper';
import { connect } from 'react-redux';
import { manageBumpCount } from '../lib/helpers';

const mapStateToProps = (state) => {
  return { 
    photos: state.gallery.photos.slice(0),
    firebaseRef: state.application.firebaseRef,
    collection: state.gallery.collection.slice(0),
    currentUser: state.oAuth.currentUser,
    breakpoint: state.application.breakpoint
  };
}

@connect(mapStateToProps)
export default class Gallery extends Component {

  didClickImageWrapper = (media) => {

    // Check if media id is in permanents
    let match = this.props.collection.find(permanentMedia => permanentMedia.media.id === media.id);
    let permanentsRef = this.props.firebaseRef.child('/permanents');

    if(match) {
      let imageRef = this.props.firebaseRef.child('/permanents/' + match.id);
      let imageBumpCountRef = this.props.firebaseRef.child('/permanents/' + match.id + '/bumpCount');
      let currentUser = this.props.currentUser;
      manageBumpCount(currentUser, match, imageRef, imageBumpCountRef);
    } else {
      let newPermanent = permanentsRef.push();
      newPermanent.set({
        media,
        bumpCount: 1
      });
    }
  }

  settingsFromBreakpoint() {
    if (this.props.breakpoint === 'small') {
      return { nudgeDistance: '10%' } 
    }
    return { nudgeDistance: '20%' } 
  }

  buildPositioningStyles(nudge={}) {

    let Styles = {
      positioning: {
        position: 'relative',
        display: 'inline-block',
        margin: '30px 0',
      }
    }
    return Object.assign(Styles.positioning, nudge);
  }

  nudge(index) {
    if (index % MULTIPLE === 0 || (index+1) % MULTIPLE === 0) {
      return { right: this.settingsFromBreakpoint().nudgeDistance };
    } else if ((index+3) % MULTIPLE === 0 || (index+4) % MULTIPLE === 0) {
      return { left: this.settingsFromBreakpoint().nudgeDistance };
    } else {
      return { left: 'auto' };
    }
  }

  render() {
    let images = this.props.photos.map((photo, index) => {
      return (
        <ImageWrapper key={index} 
                      src={photo.images.standard_resolution.url} 
                      onClick={this.didClickImageWrapper} 
                      media={photo}
                      style={this.buildPositioningStyles(this.nudge(index))} />
      )
    });
    return (<div>{images}</div>);
  }
}
