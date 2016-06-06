import openPopup, { parsePopupURL } from '../lib/popup';
import ENV from '../config/Environment';
import { getCurrentUser } from '../api/instagram';

/* Action Types */
export const OAUTH_SIGN_IN_START    = 'OAUTH_SIGN_IN_START';
export const OAUTH_SIGN_IN_SUCCESS  = 'OAUTH_SIGN_IN_SUCCESS';
export const DID_FETCH_CURRENT_USER = 'DID_FETCH_CURRENT_USER';
export const OAUTH_SIGN_IN_ERROR    = 'OAUTH_SIGN_IN_ERROR';
export const CLEAR_CURRENT_USER     = 'CLEAR_CURRENT_USER';

/* Action Creators */
export function oAuthSignInStart() {
  return { type: OAUTH_SIGN_IN_START };
}
export function oAuthSignInSuccess(accessToken) {
  return { type: OAUTH_SIGN_IN_SUCCESS, accessToken };
}
export function didFetchCurrentUser(user) {
  return { type: DID_FETCH_CURRENT_USER, user };
}
export function oAuthSignInError(error) {
  return { type: OAUTH_SIGN_IN_ERROR, error };
}
export function clearCurrentUser() {
  return { type: CLEAR_CURRENT_USER };
}

/* Private Functions */
function oAuthEndpointForProvider(provider) {
  switch(provider) {
    case 'instagram':
      return `${ENV.INSTAGRAM_API_ENDPOINT}/oauth/authorize/?client_id=${ENV.INSTAGRAM_CLIENT_ID}&redirect_uri=${ENV.OAUTH_REDIRECT_URI}&response_type=token&scope=basic+public_content`;
  }
}

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
        resolve(creds.access_token);
      }

      if (popup.closed) {
        window.clearInterval(popupInterval);
        reject({ error: 'Instagram oAuth Window was Closed.' });
      }
    }, 30);
  });
}

function resolveCurrentUser(accessToken) {
  return dispatch => {
    dispatch(oAuthSignInSuccess(accessToken));
    return getCurrentUser(accessToken)
      .then(currentUser => {
        dispatch(didFetchCurrentUser(currentUser));
        return currentUser;
      });
  }
}

/* For Dispatch */
export function oAuthBegin(provider, accessToken) {
  return dispatch => {
    dispatch(oAuthSignInStart());

    let promise;
    if (accessToken) {
      dispatch(oAuthSignInSuccess(accessToken));
      promise = resolveCurrentUser(accessToken)(dispatch);
    } else {
      promise = authenticateViaPopup(openPopup(provider, oAuthEndpointForProvider(provider)))
        .then(accessToken => resolveCurrentUser(accessToken)(dispatch));
    }

    return promise
      .catch(error => { dispatch(oAuthSignInError(error)); });
  };
}
