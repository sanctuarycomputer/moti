import { oAuthBegin } from '../actions/oauth';
import { fetchPhotosForHashtag } from '../actions/gallery';
import { getHashtagPhotos } from '../api/instagram';

import { connectToCuratorsSocket } from '../actions/curator';

export default function(store) {
  let dispatch = store.dispatch;
  const accessToken = window.localStorage.getItem('instagramAccessToken');

  if (accessToken) {
    oAuthBegin('instagram', accessToken)(dispatch).then(currentUser => {
      connectToCuratorsSocket()(dispatch).then(curators => {
        let currentCurator = store.getState().curator.currentCurator;
        if (currentCurator && !currentCurator.isDummy) {
          return Promise.all(currentCurator.tags.map(tag => fetchPhotosForHashtag(tag, accessToken)(dispatch)));
        }
      })
    });
  }
}