import { oAuthBegin } from '../actions/oauth';

export default function(dispatch) {
  const accessToken = window.localStorage.getItem('instagramAccessToken');
  if (accessToken) {
    oAuthBegin('instgram', accessToken)(dispatch);
  }
}
