import openPopup, { parsePopupURL } from '../lib/popup';
import ENV from '../config/Environment';
import { getCurrentUser } from '../api/instagram';

/* Action Types */
export const OAUTH_SIGN_IN_START = 'OAUTH_SIGN_IN_START';
export const OAUTH_SIGN_IN_SUCCESS = 'OAUTH_SIGN_IN_SUCCESS';
export const DID_FETCH_CURRENT_USER = 'DID_FETCH_CURRENT_USER';
export const OAUTH_SIGN_IN_ERROR = 'OAUTH_SIGN_IN_ERROR';
export const CLEAR_CURRENT_USER = 'CLEAR_CURRENT_USER';

/* Action Creators */
export function oAuthSignInStart(provider, endpoint) {
  return { type: OAUTH_SIGN_IN_START, provider, endpoint };
}
export function oAuthSignInSuccess(creds) {
  return { type: OAUTH_SIGN_IN_SUCCESS, creds };
}
export function didFetchCurrentUser(user) {
  return { type: DID_FETCH_CURRENT_USER, user };
}
export function oAuthSignInError(provider, error) {
  return { type: OAUTH_SIGN_IN_ERROR, provider, error };
}
export function clearCurrentUser() {
  return { type: CLEAR_CURRENT_USER };
}

/* Private Functions */
function authenticateViaPopup(popup) {
  return new Promise((resolve, reject) => {
    let popupInterval = window.setInterval(() => {
      
      let creds;
      try {
        creds = parsePopupURL(popup.document.URL);
      } catch (err) {}

      if (creds) {
        window.clearInterval(popupInterval);
        popup.close();
        resolve(creds);
      }

      if (popup.closed) {
        window.clearInterval(popupInterval);
        reject({ error: 'Instagram oAuth Window was Closed.' });
      }
    }, 1000);
  });
}

/* For Dispatcher */
export function oAuthBegin(provider, endpoint) {
  return dispatch => {
    dispatch(oAuthSignInStart(provider, endpoint));

    return authenticateViaPopup(openPopup(provider, endpoint, 'Login to MOTI'))
      .then(creds => { 
        dispatch(oAuthSignInSuccess(creds));
        return getCurrentUser(creds.access_token)
          .then(currentUser => {
            dispatch(didFetchCurrentUser(currentUser));
            return currentUser;
          });
      })
      .catch(error => { dispatch(oAuthSignInError(provider, error)); });
  };
}
