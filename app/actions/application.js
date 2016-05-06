import { oAuthBegin } from './oauth';
import { fetchPhotosForHashtag } from './gallery';

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
  return dispatch => {
    if (accessToken) {
      // User is returning, do setup.
      return oAuthBegin('instagram', accessToken)(dispatch).then(() => {
        return Promise.all([
          fetchPhotosForHashtag('bortsimpson', accessToken)(dispatch),
          fetchPhotosForHashtag('houndstooth', accessToken)(dispatch),
          fetchPhotosForHashtag('edruscha', accessToken)(dispatch)
        ])
        .then(() => dispatch(applicationDidLoad()))
        .catch(errors => dispatch(applicationDidNotLoad(errors)));
      });
    } else {
      // Nothing to load!
      window.setTimeout(() => { dispatch(applicationDidLoad()); }, 1);
    }
  };
}
