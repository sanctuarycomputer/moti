import { 
  DID_START_FETCHING_PHOTOS,
  DID_FINISH_FETCHING_PHOTOS
} from '../actions/gallery';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  SUCCESS: 'success',
  ERROR: 'error'
}

const initialState = {
  status: Status.IDLE,
  photos: [],
  error: null
};

export default function gallery(state=initialState, action) {
  switch(action.type) {
    case DID_START_FETCHING_PHOTOS:
      return {
        status: Status.PENDING,
        photos: state.photos,
        error: null
      };
    case DID_FINISH_FETCHING_PHOTOS:
      return {
        status: Status.SUCCESS,
        photos: state.photos.concat(action.photos),
        error: null
      };
    default:
      return state;
  }
}
