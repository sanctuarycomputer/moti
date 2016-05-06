import React, { Component } from 'react';
const { PropTypes } = React;
import Radium from 'radium';

import CoreStyles from '../../lib/styles';
const { 
  colors: { 
    white, 
    grey 
  }
} = CoreStyles;


const Styles = {
  title: {
    borderBottom: '3px solid',
    borderColor: white,
    display: 'inline-block',
    marginBottom: '60px'
  },
  curator: {
    marginBottom: '60px',
    color: white 
  },
  tagList: {
    color: grey
  }
};

const DummyCuratorData = [
  { name: 'Elizabeth Karp Evans', date: {month: 'April', year: '1969'}, tagList: '#art, #denim, #portrait' },
  { name: 'Adam Turnbull', date: {month: 'February', year: '1981'}, tagList: '#art, #denim, #portrait' },
  { name: 'Sebastian Odell', date: {month: 'March', year: '1989'}, tagList: '#art, #denim, #portrait' },
  { name: 'Hugh Francis', date: {month: 'May', year: '2016'}, tagList: '#art, #denim, #portrait' }
];

@Radium
export default class Curators extends Component {

  renderCurators(data) {
    return data.map((curator, index) => {
      return (
        <div key={index} style={[Styles.curator]}>
          <span>{curator.name}</span> - <span>{curator.date.month}, {curator.date.year}</span>
          <br />
          <span style={[Styles.tagList]}>{curator.tagList}</span>
        </div>
      );
    });
  }

  render() {
    return (
      <div>
        {this.renderCurators(DummyCuratorData)}
      </div>
    );
  }
}
