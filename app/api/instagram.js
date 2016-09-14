import ENV from '../config/Environment';
import fetchJsonp from 'fetch-jsonp';

export function getCurrentUser(accessToken) {
  return fetchJsonp(`${ENV.INSTAGRAM_API_ENDPOINT}/v1/users/self/?access_token=${accessToken}`)
    .then(response => {
      return response.json().then(data => {
        return {
          id:             data.data.id,
          fullName:       data.data.full_name,
          username:       data.data.username,
          profilePicture: data.data.profile_picture,
        };
      })
    });
}

export function getHashtagPhotos(tag) {
  return fetchJsonp(`${ENV.GOOGLE_API_ENDPOINT}?q=${tag}&searchType=image&cx=${ENV.GOOGLE_SEARCH_ID}&key=${ENV.GOOGLE_API_KEY}`)
    .then(response => {
      return response.json().then(data => {
        if (data.error) {
          throw new Error(data.error.message);
        } else {
          return data.items;
        }
      })
    });
}
