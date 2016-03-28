import React, { Component } from 'react';
import Radium from 'radium';

import Gallery from './Gallery.js';

const ImageUrls = [
  'http://payload397.cargocollective.com/1/0/128/10253258/Unknown-9_1600_c.jpeg',
  'http://payload397.cargocollective.com/1/0/128/10253258/Unknown-8_1600_c.jpeg',
  'http://payload397.cargocollective.com/1/0/128/10253258/Unknown-6_1600_c.jpeg'
]

export default class Home extends Component {
  render() { return (<Gallery imageUrls={ImageUrls} />); }
}
