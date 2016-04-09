import React, { Component } from 'react';
const { PropTypes } = React;

export default class Letter extends Component {
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
    let loading = {
      display: 'inline'
    };
    
    let styleVariant = this.state.isLoading ? loading:this.props.loaded;

    return (
      <div style={styleVariant}>
        {this.props.character}
      </div>
    )
  }
}