import { 
  DID_START_FETCHING_PHOTOS,
  DID_FINISH_FETCHING_PHOTOS
} from '../actions/gallery';

import { 
  FIREBASE_DID_UPDATE
} from '../actions/application';

import { shuffle } from '../lib/utils';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  SUCCESS: 'success',
  ERROR: 'error'
}

const initialState = {
  status: Status.IDLE,
  photos: [],
  collection: [],
  error: null
};

export default function gallery(state=initialState, action) {
  switch(action.type) {
    case DID_START_FETCHING_PHOTOS:
      return {
        status: Status.PENDING,
        photos: state.photos,
        collection: state.collection,
        error: null
      };
    case DID_FINISH_FETCHING_PHOTOS:
      return {
        status: Status.SUCCESS,
        photos: shuffle(state.photos.concat(action.photos)),
        collection: state.collection,
        error: null
      };
    case FIREBASE_DID_UPDATE:
      let permanentsObj = action.snapshot.val().permanents;
      let permanents = [];
      for(let firebaseId in permanentsObj) { 
        if (permanentsObj.hasOwnProperty(firebaseId)) {
          let mediaObj = permanentsObj[firebaseId];
          mediaObj.id = firebaseId;
          permanents.push(mediaObj);
        }
      }

      let orderedPermanents = permanents.sort(function (a, b) {
        if (a.bumpCount > b.bumpCount) {
          return -1;
        }
        if (a.bumpCount < b.bumpCount) {
          return 1;
        }
        return 0;
      });
      console.log(orderedPermanents)

      return {
        status: Status.SUCCESS,
        photos: state.photos,
        collection: orderedPermanents,
        error: null
      };
    default:
      return state;
  }
}
