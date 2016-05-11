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
        debugger;
        let currentCurator = store.getState().curator.currentCurator[0];
        debugger;
        if (currentCurator) {
          return Promise.all(currentCurator.tags.map(tag => fetchPhotosForHashtag(tag, accessToken)(dispatch)));
        }
      })
    });
  }
}