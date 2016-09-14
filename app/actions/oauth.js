import ENV from '../config/Environment';
import { getCurrentUser } from '../api/instagram';

/* Action Types */
export const DID_FETCH_CURRENT_USER = 'DID_FETCH_CURRENT_USER';
export const DID_SIGN_IN            = 'DID_SIGN_IN';

/* Action Creators */
export function didFetchCurrentUser(user) {
  return { type: DID_FETCH_CURRENT_USER, user };
}
export function didSignIn(accessToken) {
  return { type: DID_SIGN_IN, accessToken };
}


function resolveCurrentUser(accessToken) {
  return dispatch => {
    dispatch(didSignIn(accessToken));
    return getCurrentUser(accessToken)
      .then(currentUser => {
        dispatch(didFetchCurrentUser(currentUser));
        return currentUser;
      });
  }
}


function generateUUID() {
  return new Promise((resolve, reject) => {
    var d = new Date().getTime();
    if(window.performance && typeof window.performance.now === "function"){
      d += performance.now(); //use high-precision timer if available
    }
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = (d + Math.random()*16)%16 | 0;
      d = Math.floor(d/16);
      return (c=='x' ? r : (r&0x3|0x8)).toString(16);
    });

    resolve(uuid);
  });
}


/* For Dispatch */
export function signIn(accessToken) {
  return dispatch => {
    let promise;
    if (accessToken) {
      dispatch(didSignIn(accessToken));
      promise = resolveCurrentUser(accessToken)(dispatch);
    } else {
      promise = generateUUID()
        .then(accessToken => resolveCurrentUser(accessToken)(dispatch));
    }

    return promise;
  };
}