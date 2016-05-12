import React, { Component } from 'react';
const { PropTypes } = React;
import Radium from 'radium';
import { connect } from 'react-redux';
import months from '../../lib/months'

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
    marginRight: '1rem',
    color: grey
  }
};

const mapStateToProps = (state) => {
  return {
    pastCurators: state.curator.pastCurators,
    futureCurators: state.curator.futureCurators
  };
}

@connect(mapStateToProps)
@Radium
export default class Curators extends Component {
  renderCurators(data) {
    return data.map((curator, index) => {
      return (
        <div key={index} style={[Styles.curator]}>
          <span>{curator.name}</span> - <span>{months[curator.date.month]}, {curator.date.year}</span>
          <br />
          <span style={[Styles.tagList]}>#{curator.tags[0]}</span>
          <span style={[Styles.tagList]}>#{curator.tags[1]}</span>
          <span style={[Styles.tagList]}>#{curator.tags[2]}</span>
        </div>
      );
    });
  }

  render() {
    let curatorSet = this.props.params.mode === 'past-curators' ? this.props.pastCurators : this.props.futureCurators;
    return (
      <div>
        {this.renderCurators(curatorSet)}
      </div>
    );
  }
}
