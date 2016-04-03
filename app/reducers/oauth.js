import { 
  OAUTH_SIGN_IN_START,
  OAUTH_SIGN_IN_SUCCESS,
  DID_FETCH_CURRENT_USER,
  OAUTH_SIGN_IN_ERROR,
  CLEAR_CURRENT_USER
} from '../actions/oauth';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  SUCCESS: 'success',
  ERROR: 'error'
}

export default function oAuth(state={}, action) {
  switch(action.type) {
    case OAUTH_SIGN_IN_START:
      return {
        status: Status.PENDING,
        currentUser: null,
        error: null
      };
    case OAUTH_SIGN_IN_SUCCESS:
      return {
        status: Status.PENDING,
        currentUser: null,
        error: null
      };
    case DID_FETCH_CURRENT_USER:
      return {
        status: Status.SUCCESS,
        currentUser: action.user,
        error: null
      };
    case OAUTH_SIGN_IN_ERROR:
      return {
        status: Status.ERROR,
        currentUser: null,
        error: action.error 
      };
    case CLEAR_CURRENT_USER:
      return {
        status: Status.IDLE,
        currentUser: null,
        error: null
      }
    default:
      return state;
  }
}
