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

const initialState = {
  status: Status.IDLE,
  currentUser: null,
  error: null,
  accessToken: null
};

export default function oAuth(state=initialState, action) {
  switch(action.type) {
    case OAUTH_SIGN_IN_START:
      window.localStorage.removeItem('instagramAccessToken');
      return {
        status: Status.PENDING,
        currentUser: null,
        error: null,
        accessToken: null
      };
    case OAUTH_SIGN_IN_SUCCESS:
      window.localStorage.setItem('instagramAccessToken', action.accessToken);
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
    case OAUTH_SIGN_IN_ERROR:
      console.log(action.error);
      window.localStorage.removeItem('instagramAccessToken');
      return {
        status: Status.ERROR,
        currentUser: null,
        error: action.error,
        accessToken: null
      };
    case CLEAR_CURRENT_USER:
      window.localStorage.removeItem('instagramAccessToken');
      return {
        status: Status.IDLE,
        currentUser: null,
        error: null,
        accessToken: null
      }
    default:
      return state;
  }
}
