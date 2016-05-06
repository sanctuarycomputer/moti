import { 
  APPLICATION_DID_LOAD
} from '../actions/application';

export const Status = {
  LOADING: 'loading',
  READY: 'ready'
}

const initialState = {
  status: Status.LOADING
};

export default function application(state=initialState, action) {
  switch(action.type) {
    case APPLICATION_DID_LOAD:
      return { status: Status.READY };
    default:
      return state;
  }
}
