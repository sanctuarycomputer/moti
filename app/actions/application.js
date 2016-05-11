import { oAuthBegin } from './oauth';
import { fetchPhotosForHashtag } from './gallery';
import { connectToCuratorsSocket } from './curator';

/* Action Types */
export const APPLICATION_DID_LOAD = 'APPLICATION_DID_LOAD';
export const APPLICATION_DID_NOT_LOAD = 'APPLICATION_DID_NOT_LOAD';

/* Action Creators */
export function applicationDidLoad() {
  return { type: APPLICATION_DID_LOAD };
}

export function applicationDidNotLoad(errors) {
  return { type: APPLICATION_DID_NOT_LOAD, errors };
}

/* For Dispatch */
export function initializeMOTI(accessToken) {
  return store => {
    let dispatch = store.dispatch
    if (accessToken) {
      oAuthBegin('instagram', accessToken)(dispatch).then(currentUser => {
        connectToCuratorsSocket()(dispatch).then(curators => {
          let currentCurator = store.getState().curator.currentCurator;
          if (currentCurator && !currentCurator.isDummy) {
            return Promise.all(currentCurator.tags.map(tag => fetchPhotosForHashtag(tag, accessToken)(dispatch)))
            .then(() => dispatch(applicationDidLoad()))
            .catch(errors => dispatch(applicationDidNotLoad(errors)));
          }
        })
      });
    } else {
      // Nothing to load!
      window.setTimeout(() => { dispatch(applicationDidLoad()); }, 1);
    }
  };
}
