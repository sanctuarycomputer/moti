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
  messages: []
};


export default function flashMessage(state=initialState, action) {
  switch (action.type) {
    case DID_SHOW_FLASH_MESSAGE:
    let messagesQueue = state.messages.slice();
        messagesQueue.push(action.payload)
      return {
        messages: messagesQueue
      };
    case DID_DISMISS_FLASH_MESSAGE:
      let messageArray = state.messages;
      let message = action.currentMessage;
      let messageIndex = messageArray.indexOf(message);
      return {
        messages: state.messages.splice(messageIndex, 1)
      };
    default: 
      return state;
  }
};