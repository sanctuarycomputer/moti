import React, { Component } from 'react';
import Radium from 'radium';
import { connect } from 'react-redux';
import { didDismissFlashMessage } from '../actions/flashMessage';
import FlashMessage from './FlashMessage';

const Styles = {
  QueueContainer: {
    width: '50%',
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: '2'
  }
};

const mapStateToProps = (state) => {
  return { 
    flashMessages: state.flashMessage.messages,
    currentMessage: state.flashMessage.currentMessage 
  }
};

const mapDispatchToProps = (dispatch) => {
  return { didDismissFlashMessage(currentMessage) { return dispatch(didDismissFlashMessage(currentMessage)) }}
};


@connect(mapStateToProps, mapDispatchToProps)
@Radium
export default class MessageQueue extends Component {

  componentWillReceiveProps(nextProps) {
   if(nextProps.currentMessage) {
      setTimeout(() => {
        this.props.didDismissFlashMessage(nextProps.currentMessage)
      }, 3000)
    }
  }

  render() {
    if(this.props.flashMessages.length) {
      let messages = this.props.flashMessages.map((message, index) => {
        return (
          <FlashMessage key={index} 
                        text={message.text}
                        status={message.status}/>
        )
      });
      return (
        <div style={[Styles.QueueContainer]}>
          {messages}
        </div>
      );
    }
    return null;
  }
};
