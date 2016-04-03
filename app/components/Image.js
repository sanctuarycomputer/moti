import React, { Component } from 'react';
const { PropTypes } = React;
import Radium from 'radium';

const Styles = {
  base:    { transition: 'opacity 500ms', width: '100%' },
  loading: { opacity: 0 },
  loaded:  { opacity: 1 },
  errored: { opacity: 0 }
}

const Status = {
  LOADING: 'loading',
  LOADED:  'loaded',
  ERRORED: 'errored'
}

@Radium
export default class Image extends Component {
  static propTypes = {
    src:     PropTypes.string.isRequired,
    onMount: PropTypes.func,
    onLoad:  PropTypes.func,
    onError: PropTypes.func
  }

  constructor(props) {
    super(...arguments);
    this.state = { status: Status.LOADING };
  }

  componentDidMount() {
    if (this.props.onMount) { this.props.onMount(); };
    let loader     = new window.Image();
    loader.onload  = this.imageDidLoad;
    loader.onerror = this.imageDidError;
    loader.src     = this.props.src;
  }

  imageDidLoad = () => {
    this.state.status = Status.LOADED;
    this.setState(this.state);
    if (this.props.onLoad) { this.props.onLoad(); };
  }

  imageDidError = () => {
    this.state.status = Status.ERRORED;
    this.setState(this.state);
    if (this.props.onError) { this.props.onError(); };
  }

  render() {
    return (<img style={[Styles.base, Styles[this.state.status], this.props.style]} src={this.props.src} />);
  }
}
