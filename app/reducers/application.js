import { 
  APPLICATION_DID_LOAD,
  APPLICATION_DID_NOT_LOAD
} from '../actions/application';

export const Status = {
  LOADING: 'loading',
  READY: 'ready',
  ERROR: 'error'
}

const initialState = {
  status: Status.LOADING,
  errors: []
};

export default function application(state=initialState, action) {
  switch(action.type) {
    case APPLICATION_DID_LOAD:
      return { 
        status: Status.READY,
        errors: []
      };
    case APPLICATION_DID_NOT_LOAD:
      return { 
        status: Status.ERROR,
        errors: action.errors
      };
    default:
      return state;
  }
}
