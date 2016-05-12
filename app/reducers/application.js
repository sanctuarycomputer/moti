import { 
  APPLICATION_DID_LOAD,
  APPLICATION_DID_NOT_LOAD,
  FIREBASE_DID_INITIALIZE,
  FIREBASE_DID_UPDATE
} from '../actions/application';

export const Status = {
  LOADING: 'loading',
  READY: 'ready',
  ERROR: 'error'
}

const initialState = {
  status: Status.LOADING,
  errors: [],
  firebaseRef: null
};

export default function application(state=initialState, action) {
  switch(action.type) {
    case APPLICATION_DID_LOAD:
      return { 
        status: Status.READY,
        errors: state.errors,
        firebaseRef: state.firebaseRef
      };
    case APPLICATION_DID_NOT_LOAD:
      return { 
        status: Status.ERROR,
        errors: action.errors,
        firebaseRef: state.firebaseRef
      };
    case FIREBASE_DID_INITIALIZE:
      return { 
        status: Status.ERROR,
        errors: action.errors,
        firebaseRef: action.firebaseRef
      };
    case FIREBASE_DID_UPDATE:
      console.log('Firebase Updated:');
      console.log(action.snapshot.val());
      return { 
        status: Status.ERROR,
        errors: action.errors,
        firebaseRef: action.firebaseRef
      };
    default:
      return state;
  }
}
