import React, { Component } from 'react';
const { PropTypes } = React;
import Radium from 'radium';

import CoreStyles from '../../lib/styles';

const Styles = {
  base: {
    textAlign: 'center'
  },
  title: {
    borderBottom: '3px solid white',
    display: 'inline-block',
    marginBottom: '60px'
  },
  curator: {
    marginBottom: '60px' 
  }
};

const DummyCuratorData = [
  { name: 'Elizabeth Karp Evans', tagList: '#art, #denim, #portrait' },
  { name: 'Adam Turnbull', tagList: '#art, #denim, #portrait' },
  { name: 'Sebastian Odell', tagList: '#art, #denim, #portrait' },
  { name: 'Hugh Francis', tagList: '#art, #denim, #portrait' }
];

@Radium
export default class Curators extends Component {

  renderCurators(data) {
    return data.map((curator, index) => {
      return (
        <div key={index} style={[CoreStyles.fontStyle, Styles.curator]}>
          <span>{curator.name}</span>
          <br />
          <span>{curator.tagList}</span>
        </div>
      );
    });
  }

  render() {
    return (
      <div style={[Styles.base]}>
        <p style={[CoreStyles.fontStyle, Styles.title]}>Curators</p>
        {this.renderCurators(DummyCuratorData)}
      </div>
    );
  }
}
