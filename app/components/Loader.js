import React, { Component } from 'react';
const { PropTypes } = React;

import Letter from './Letter';

export default class Loader extends Component {
  static propTypes = {
    isLoading: PropTypes.bool.isRequired
  }

  constructor(props) {
    super(...arguments);

    this.state = {
      isLoading: props.isLoading
    };
  }

  componentWillReceiveProps(nextProps) {
    this.state.isLoading = nextProps.isLoading;
    this.setState(this.state);
  }

  render() {

    //Loader Style Variants
    let loading = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(' + '-50%,' + ' -50%)',
      zIndex: 2
    };

    let loaded = {
      left: '',
      right: '',
      transform: ''
    };

    //Loaded letter positions
    let topLeft = {
      position: 'absolute',
      top: 0,
      left: 0
    };

    let topRight = {
      position: 'absolute',
      top: 0,
      right: 0
    };

    let bottomRight = {
      position: 'absolute',
      bottom: 0,
      right: 0
    };

    let bottomLeft = {
      position: 'absolute',
      bottom: 0,
      left: 0
    };


    let styleVariant = this.state.isLoading ? loading:loaded;

    return (
      <div style={styleVariant}>
        <Letter character='M' isLoading={this.state.isLoading} loaded={topLeft}/>
        <Letter character='O' isLoading={this.state.isLoading} loaded={topRight}/>
        <Letter character='T' isLoading={this.state.isLoading} loaded={bottomLeft}/>
        <Letter character='I' isLoading={this.state.isLoading} loaded={bottomRight}/>
      </div>
    )
  }
}