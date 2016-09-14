import ENV from '../config/Environment';
import fetchJsonp from 'fetch-jsonp';

export function getHashtagPhotos(tag, accessToken) {
  return fetchJsonp(`${ENV.INSTAGRAM_API_ENDPOINT}/v1/tags/${tag}/media/recent?access_token=${accessToken}`)
    .then(response => {
      return response.json().then(data => {
        if (data.meta.code !== 200) {
          throw new Error(data.meta);
        } else {
          return data.data;
        }
      })
    });
}
