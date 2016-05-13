import React, { Component } from 'react';

import PermanentGallery from '../components/PermanentGallery';
import { connect } from 'react-redux';

export default class PermanentCollection extends Component {

  render() {
    return (
      <PermanentGallery/>
    )
  }
}