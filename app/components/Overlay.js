import React, {
  Component
} from 'react';

export default class Overlay extends Component {
  constructor(props) {
    super(...arguments);

    this.state = {
      isLoading: props.isLoading
    }
  }

  componentWillReceiveProps(nextProps) {
    this.state.isLoading = nextProps.isLoading;
    this.setState(this.state);
  }

  render() {
    let loading = {
      backgroundColor: 'black',
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      zIndex: 1
    }

    let loaded = {
      display: 'none'
    }

    let styleVariant = this.state.isLoading ? loading:loaded;

    return (
      <div style={styleVariant}></div>
    )
  }
}