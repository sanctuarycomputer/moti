import React, { Component } from 'react';

const { PropTypes } = React;
const MULTIPLE = 5;

import { hasherize } from '../lib/utils';
import ImageWrapper from './ImageWrapper';
import { connect } from 'react-redux';
import { manageBumpCount } from '../lib/helpers';
import { didShowFlashMessage } from '../actions/flashMessage';
import copy  from '../lib/copy';

const mapStateToProps = (state) => {
  return {
    photos: state.gallery.photos.slice(0),
    firebaseRef: state.application.firebaseRef,
    collection: state.gallery.collection.slice(0),
    currentUser: state.oAuth.currentUser,
    breakpoint: state.application.breakpoint
  };
}

const mapDispatchToProps = (dispatch) => {
  return { didShowFlashMessage(status, text) { return dispatch(didShowFlashMessage(status, text)) }}
}


@connect(mapStateToProps, mapDispatchToProps)
export default class Gallery extends Component {

  didClickImageWrapper = (media) => {
    let mediaId = hasherize(media.link);

    // Check if media id is in permanents
    let match = this.props.collection.find(permanentMedia => permanentMedia.mediaId === mediaId);
    let permanentsRef = this.props.firebaseRef.child('/permanents');

    if(match) {
      let imageRef = this.props.firebaseRef.child('/permanents/' + match.id);
      let imageBumpCountRef = this.props.firebaseRef.child('/permanents/' + match.id + '/bumpCount');
      let currentUser = this.props.currentUser;
      let didBump = manageBumpCount(currentUser, match, imageRef, imageBumpCountRef);

      this.props.didShowFlashMessage('warning', copy.flashMessages.beenSaved)

    } else {
      let newPermanent = permanentsRef.push();
      newPermanent.set({
        mediaId: mediaId,
        media,
        bumpCount: 1
      });
      this.props.didShowFlashMessage('success', copy.flashMessages.saved)
    }
  }

  settingsFromBreakpoint() {
    if (this.props.breakpoint === 'small') {
      return { nudgeDistance: '0' }
    }
    return { nudgeDistance: '20%' }
  }

  buildPositioningStyles(nudge={}) {

    let Styles = {
      positioning: {
        position: 'relative',
        display: 'inline-block',
        margin: '5.5rem 0',
      }
    }
    return Object.assign(Styles.positioning, nudge);
  }

  getBumpCount(link) {
    let mediaId = hasherize(link);
    let filter = this.props.collection.filter((media) => {
      return media.mediaId === mediaId;
    });
    return filter.length ? filter[0].bumpCount : 0;
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
                      src={photo.link}
                      onClick={this.didClickImageWrapper}
                      media={photo}
                      bumpCount={this.getBumpCount(photo.link)}
                      style={this.buildPositioningStyles(this.nudge(index))} />
      )
    });
    return (<div>{images}</div>);
  }
}
