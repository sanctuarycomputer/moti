import { oAuthBegin } from './oauth';
import { fetchPhotosForHashtag } from './gallery';
import ENV from '../config/Environment';
import Firebase from 'firebase';

/* Action Types */
export const APPLICATION_DID_LOAD = 'APPLICATION_DID_LOAD';
export const APPLICATION_DID_NOT_LOAD = 'APPLICATION_DID_NOT_LOAD';
export const FIREBASE_DID_INITIALIZE = 'FIREBASE_DID_INITIALIZE';
export const FIREBASE_DID_UPDATE = 'FIREBASE_DID_UPDATE';
export const BROWSER_DID_RESIZE = 'BROWSER_DID_RESIZE';


/* Action Creators */
export function applicationDidLoad() {
  return { type: APPLICATION_DID_LOAD };
}

export function applicationDidNotLoad(errors) {
  return { type: APPLICATION_DID_NOT_LOAD, errors };
}

export function firebaseDidInitialize(firebaseRef) {
  return { type: FIREBASE_DID_INITIALIZE, firebaseRef }
}

export function firebaseDidUpdate(snapshot) {
  return { type: FIREBASE_DID_UPDATE, snapshot }
}

export function browserDidResize() {
  return { type: BROWSER_DID_RESIZE }
}

/* For Dispatch */
export function authorizeUserAndLoadImages(tags=[], accessToken) {
  return dispatch => {
    return oAuthBegin('instagram', accessToken)(dispatch).then(currentUser => {
      if (!accessToken) { accessToken = window.localStorage.instagramAccessToken; }
      return Promise.all(tags.map(tag => fetchPhotosForHashtag(tag, accessToken)(dispatch)))
    });
  }
}

export function initializeMOTI(accessToken) {
  return store => {
    let dispatch = store.dispatch

    dispatch(firebaseDidInitialize(new Firebase(ENV.FIREBASE_ROOT_URL)));
    const firebaseRef = store.getState().application.firebaseRef;

    let firebasePromise = new Promise(resolve => {
      firebaseRef.on('value', snapshot => {
        dispatch(firebaseDidUpdate(snapshot));
        resolve();
      });
    });

    window.onresize = () => dispatch(browserDidResize());

    if (accessToken) {
      firebasePromise.then(() => {
        let tags = store.getState().curator.currentCurator.tags;
        return authorizeUserAndLoadImages(tags, accessToken)(dispatch);
      })
    }

    return firebasePromise
      .then(() => { dispatch(applicationDidLoad()) })
      .catch(errors => dispatch(applicationDidNotLoad(errors)));
  };
}
