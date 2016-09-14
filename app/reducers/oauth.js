import { 
  DID_SIGN_IN,
  DID_FETCH_CURRENT_USER
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
    case DID_SIGN_IN:
      window.localStorage.setItem('userUUID', action.accessToken);
      return {
        status: Status.PENDING,
        currentUser: null,
        error: null,
        accessToken: action.accessToken
      };
    case DID_FETCH_CURRENT_USER:
      return {
        status: Status.SUCCESS,
        currentUser: action.user,
        error: null,
        accessToken: state.accessToken
      };
    default:
      return state;
  }
}
