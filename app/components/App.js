import React, {
  Component
} from 'react';

const LOAD_TIME = 3000;

class Letter extends Component {
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

class Loader extends Component {
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

class Overlay extends Component {
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
