import { 
  APPLICATION_DID_LOAD,
  APPLICATION_DID_NOT_LOAD,
  FIREBASE_DID_INITIALIZE,
  FIREBASE_DID_UPDATE,
  BROWSER_DID_RESIZE,
} from '../actions/application';

export const Status = {
  LOADING: 'loading',
  READY: 'ready',
  ERROR: 'error'
}

const Breakpoints = {
  medium: 800,
  large: 1200
}

function resolveBreakpoint(width=window.innerWidth) {
  return width < Breakpoints.medium ? 'small' : (width < Breakpoints.large ? 'medium' : 'large')
}

const initialState = {
  status: Status.LOADING,
  errors: [],
  firebaseRef: null,
  breakpoint: resolveBreakpoint()
};

export default function application(state=initialState, action) {
  switch(action.type) {
    case APPLICATION_DID_LOAD:
      return { 
        status: Status.READY,
        errors: state.errors,
        firebaseRef: state.firebaseRef,
        breakpoint: state.breakpoint
      };
    case APPLICATION_DID_NOT_LOAD:
      return { 
        status: Status.ERROR,
        errors: action.errors,
        firebaseRef: state.firebaseRef,
        breakpoint: state.breakpoint
      };
    case FIREBASE_DID_INITIALIZE:
      return { 
        status: state.status,
        errors: state.errors,
        firebaseRef: action.firebaseRef,
        breakpoint: state.breakpoint
      };
    case FIREBASE_DID_UPDATE:
      console.log('Firebase Updated:');
      console.log(action.snapshot.val());
      return { 
        status: state.status,
        errors: state.errors,
        firebaseRef: state.firebaseRef,
        breakpoint: state.breakpoint
      };
    case BROWSER_DID_RESIZE:
      return {
        status: state.status,
        errors: state.errors,
        firebaseRef: state.firebaseRef,
        breakpoint: resolveBreakpoint()
      }

    default:
      return state;
  }
}
