import { oAuthBegin } from './oauth';
import { fetchPhotosForHashtag } from './gallery';
import ENV from '../config/Environment';
import Firebase from 'firebase';

/* Action Types */
export const APPLICATION_DID_LOAD = 'APPLICATION_DID_LOAD';
export const APPLICATION_DID_NOT_LOAD = 'APPLICATION_DID_NOT_LOAD';
export const FIREBASE_DID_INITIALIZE = 'FIREBASE_DID_INITIALIZE';
export const FIREBASE_DID_UPDATE = 'FIREBASE_DID_UPDATE';


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

/* For Dispatch */
export function initializeMOTI(accessToken) {
  return store => {
    let dispatch = store.dispatch
    if (accessToken) {

      // Init Firebase
      dispatch(firebaseDidInitialize(new Firebase(ENV.FIREBASE_ROOT_URL)));
      const firebaseRef = store.getState().application.firebaseRef;


      // Listen for all Firebase Changes
      let firebaseHasLoadedFirstPayload = false;
      firebaseRef.on('value', snapshot => {

        dispatch(firebaseDidUpdate(snapshot));

        if (!firebaseHasLoadedFirstPayload) {
          firebaseHasLoadedFirstPayload = true;
          // We have firebase 
          oAuthBegin('instagram', accessToken)(dispatch).then(currentUser => {
            let currentCurator = store.getState().curator.currentCurator;
            if (currentCurator && !currentCurator.isDummy) {
              return Promise.all(currentCurator.tags.map(tag => fetchPhotosForHashtag(tag, accessToken)(dispatch)))
              .then(() => dispatch(applicationDidLoad()))
              .catch(errors => dispatch(applicationDidNotLoad(errors)));
            }
          });
        }

      });
    } else {
      // Nothing to load!
      window.setTimeout(() => { dispatch(applicationDidLoad()); }, 1);
    }
  };
}
