import { getHashtagPhotos } from '../api/instagram';

/* Action Types */
export const DID_START_FETCHING_PHOTOS = 'DID_START_FETCHING_PHOTOS';
export const DID_FINISH_FETCHING_PHOTOS = 'DID_FINISH_FETCHING_PHOTOS';

/* Action Creators */
export function didStartFetchingPhotos() {
  return { type: DID_START_FETCHING_PHOTOS };
}

export function didFinishFetchingPhotos(data) {
  return { type: DID_FINISH_FETCHING_PHOTOS, photos: data };
}

/* For Dispatch */
export function fetchPhotosForHashtag(hashtag) {
  return dispatch => {
    dispatch(didStartFetchingPhotos());

    return getHashtagPhotos(hashtag)
      .then(data => { dispatch(didFinishFetchingPhotos(data)); });

  }
}
