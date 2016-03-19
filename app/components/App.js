import React, {
  Component
} from 'react';

import Loader from './Loader';
import Overlay from './Overlay';

const LOAD_TIME = 3000;

export default class App extends Component {
  constructor(props) {
    super(...arguments);

    this.state = {
      isLoading: false
    };
  }

  componentDidMount() {
    this.startLoading();
    setTimeout(this.stopLoading.bind(this), LOAD_TIME)
  }

  startLoading() {
    this.state.isLoading = true;
    this.setState(this.state);
  }

  stopLoading() {
    this.state.isLoading = false;
    this.setState(this.state);
  }

  render() {
    let mainStyle = {
      color: 'white',
      fontSize: 100,
    };

    return (
      <div style={mainStyle}>
        <Overlay isLoading={this.state.isLoading} />
        <Loader isLoading={this.state.isLoading} /> 
        {this.props.children}
      </div>
    )
  }
}
