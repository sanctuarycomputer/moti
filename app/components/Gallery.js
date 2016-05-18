import React, { Component } from 'react';

const { PropTypes } = React;
const MULTIPLE = 5;

import ImageWrapper from './ImageWrapper';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  return { 
    photos: state.gallery.photos.slice(0),
    firebaseRef: state.application.firebaseRef,
    collection: state.gallery.collection.slice(0),
    breakpoint: state.application.breakpoint
  };
}

@connect(mapStateToProps)
export default class Gallery extends Component {

  didClickImageWrapper = (media) => {
    // Check if media id is in permanents
    let permanentsRef = this.props.firebaseRef.child('/permanents');

    let match = this.props.collection.find(permanentMedia => permanentMedia.media.id === media.id);

    if(match) {
      let matchRef = this.props.firebaseRef.child('/permanents/' + match.id + '/bumpCount')

      matchRef.transaction(currentBumpCount => currentBumpCount+1 )

    } else {
      let newPermanent = permanentsRef.push();
      newPermanent.set({
        media,
        bumpCount: 1
      });
    }
  }

  randomNumberFromRange(min, max) {
    return Math.floor(Math.random()*(max-min+1)+min);
  }

  settingsFromBreakpoint() {
    if (this.props.breakpoint === 'small') {
      return {
        variableWidth: this.randomNumberFromRange(95, 100),
        nudgeDistance: '10%'
      } 
    }
    return {
      variableWidth: this.randomNumberFromRange(50, 90),
      nudgeDistance: '20%'
    } 
  }

  buildPositioningStyles(nudge={}) {

    let Styles = {
      positioning: {
        position: 'relative',
        display: 'inline-block',
        width: this.settingsFromBreakpoint().variableWidth + '%',
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
