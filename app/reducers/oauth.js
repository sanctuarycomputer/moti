import { 
  DID_SIGN_IN,
  SIGN_IN_START
} from '../actions/oauth';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  SUCCESS: 'success',
  ERROR: 'error'
}

const initialState = {
  status: Status.IDLE,
  currentUser: null,
  error: null,
  accessToken: null
};

export default function oAuth(state=initialState, action) {
  switch(action.type) {
    case SIGN_IN_START:
      return {
        status: Status.PENDING,
        currentUser: null,
        error: null,
        accessToken: null,
      };
    case DID_SIGN_IN:
      window.localStorage.setItem('userUUID', action.accessToken);
      return {
        status: Status.SUCCESS,
        currentUser: { id: action.accessToken },
        error: null,
        accessToken: action.accessToken
      };
    default:
      return state;
  }
}
