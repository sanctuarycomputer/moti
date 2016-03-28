import React, { Component } from 'react';
import Radium from 'radium';

const {
  PropTypes: { bool }
} = React;

const Styles = {
  base: {
    backgroundColor: 'pink'
  },
  active: {
    backgroundColor: 'blue' 
  }
}

@Radium
export default class Home extends Component {
  static propTypes = {
    reactIsRad: bool.isRequired
  }

  render() {
    const {
      reactIsRad 
    } = this.props;

    return (
      <div
        style={[
          Styles.base
        ]}>
          Homepage Specific
      </div>
    );
  }
}
