import React, { Component } from 'react';
import Radium from 'radium';
import { connect } from 'react-redux';
import { userDidDismissFlashMessage } from '../actions/flashMessage';

const Styles = {
  flashContainer: {
    width: '60%',
    padding: '1rem',
    backgroundColor: 'red',
    zIndex: '9999',
    textAlign: 'center',
    margin: '0 auto'
  },
  messageText: {
    fontSize: '18px',
    color: 'black'
  }
};





const mapStateToProps = (state) => {
  return { flashMessage: state.flashMessage.message }
};

const mapDispatchToProps = (dispatch) => {
  return { userDidDismissFlashMessage() { return dispatch(userDidDismissFlashMessage()) }}
};

export default connect(mapStateToProps, mapDispatchToProps)(Radium(props => {
  if(props.flashMessage.status !== 'idle') {
    return (
      <div style={[Styles.flashContainer]}>
        <p style={[Styles.messageText]}>{props.flashMessage.text}</p>
      </div>
    );
  }
  return null;
}));