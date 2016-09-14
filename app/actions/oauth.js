import ENV from '../config/Environment';
import { generateUUID } from '../lib/utils'; 

/* Action Types */
export const SIGN_IN_START = 'SIGN_IN_START';
export const DID_SIGN_IN   = 'DID_SIGN_IN';


/* Action Creators */
export function signInStart() {
  return { type: SIGN_IN_START };
}
export function didSignIn(accessToken) {
  return { type: DID_SIGN_IN, accessToken };
}


/* For Dispatch */
export function signIn(accessToken) {
  return dispatch => {
    dispatch(signInStart());
    if (accessToken) {
      dispatch(didSignIn(accessToken));
    } else {
      dispatch(didSignIn(generateUUID()));
    }
  };
}