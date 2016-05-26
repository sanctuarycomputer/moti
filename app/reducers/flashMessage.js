import { 
  DID_SHOW_FLASH_MESSAGE,
  FLASH_MESSAGE_DID_TIMEOUT,
  USER_DID_DISMISS_FLASH_MESSAGE
} from '../actions/flashMessage';

const Message = {
  bumped: {
    text: 'Thanks for bumping the art work.',
    color: 'pink'
  },
  saved: {
    text: 'That piece has been added to our permanent collection.',
    color: 'green'
  },
  denied: {
    text: 'Sorry, you can only bump once per piece.',
    color: 'red'
  },
  idle: {
    text: '',
    color: ''
  }
};

const Status = {
  IDLE: 'idle',
  SUCCESS: 'success'
  WARNING: 'warning'
}

const initialState = {
  status: Status.idle,
  message: Message.idle
};