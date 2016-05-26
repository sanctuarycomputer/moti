import { 
  DID_SHOW_FLASH_MESSAGE,
} from '../actions/flashMessage';

const MessageType = {
  bumped: {
    text: 'Thanks for bumping the art work.',
    color: 'pink',
    status: 'success'
  },
  saved: {
    text: 'That piece has been added to our permanent collection.',
    color: 'green',
    status: 'success'
  },
  denied: {
    text: 'Sorry, you can only bump once per piece.',
    color: 'yellow',
    status: 'error'
  },
  cantAuthenticate: {
    text: 'There was an error logging you in, try again.',
    color: 'red',
    status: 'error'
  },
  idle: {
    text: null,
    color: null,
    status: 'idle'
  }
};

const initialState = {
  message: MessageType.idle
};

export default function flashMessage(state=initialState, action) {
  switch (action.type) {
    case DID_SHOW_FLASH_MESSAGE:
      return {
        message: MessageType.action.payload
      };
    default: 
      return state;
  }
}