import { oAuthBegin } from '../actions/oauth';
import { fetchPhotosForHashtag } from '../actions/gallery';
import { getHashtagPhotos } from '../api/instagram';

export default function(dispatch) {
  const accessToken = window.localStorage.getItem('instagramAccessToken');

  if (accessToken) {
    oAuthBegin('instgram', accessToken)(dispatch).then(currentUser => {
      return fetchPhotosForHashtag('bortsimpson', accessToken)(dispatch).then(() => {
        return fetchPhotosForHashtag('houndstooth', accessToken)(dispatch);
      })
    });
  }
}