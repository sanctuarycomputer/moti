import React, { Component } from 'react';

import Login from '../components/Login';
import Gallery from '../components/Gallery';
import { connect } from 'react-redux';

const ImageUrls = [
  'http://payload397.cargocollective.com/1/0/128/10253258/Unknown-9_1600_c.jpeg',
  'http://payload397.cargocollective.com/1/0/128/10253258/Unknown-8_1600_c.jpeg',
  'http://payload397.cargocollective.com/1/0/128/10253258/Unknown-6_1600_c.jpeg'
]

const mapStateToProps = (state) => {
  return { currentUser: state.oAuth.currentUser };
}

@connect(mapStateToProps)
export default class Home extends Component {
  render() {
    if (this.props.currentUser) { return (<Gallery imageUrls={ImageUrls} />); }
    return (<Login />);
  }
}
