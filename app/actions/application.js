import { oAuthBegin } from './oauth';

/* Action Types */
export const APPLICATION_DID_LOAD = 'APPLICATION_DID_LOAD';

/* Action Creators */
export function applicationDidLoad() {
  return { type: APPLICATION_DID_LOAD };
}

/* For Dispatch */
export function initializeMOTI(accessToken) {
  return dispatch => {
    if (accessToken) {
      // User is returning, do setup.
      oAuthBegin('instagram', accessToken)(dispatch).then(() => {
        dispatch(applicationDidLoad());
      });
    } else {
      // Nothing to load!
      window.setTimeout(() => {
        dispatch(applicationDidLoad());
      }, 1);
    }
  };
}
