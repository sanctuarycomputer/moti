import { 
  DID_SHOW_FLASH_MESSAGE,
  DID_DISMISS_FLASH_MESSAGE
} from '../actions/flashMessage';

export const MessageStatus = {
  SUCCESS: 'loading',
  ERROR: 'ready',
  INFO: 'error',
  WARNING: 'warning'
}


const initialState = {
  messages: [],
  currentMessage: null
};


export default function flashMessage(state=initialState, action) {
  switch (action.type) {
    case DID_SHOW_FLASH_MESSAGE:
    let messagesQueue = state.messages.slice();
        messagesQueue.push(action.payload)
      return {
        messages: messagesQueue,
        currentMessage: messagesQueue[messagesQueue.length-1]
      };
    case DID_DISMISS_FLASH_MESSAGE:
      let newMessageArray = state.messages.slice();
      let message = action.currentMessage;
      let messageIndex = newMessageArray.indexOf(message);
      newMessageArray.splice(messageIndex, 1)
      return {
        messages: newMessageArray,
        currentMessage: newMessageArray.length ? newMessageArray[newMessageArray.length-1] : initialState.currentMessage
      };
    default: 
      return state;
  }
};