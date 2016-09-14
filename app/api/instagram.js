import ENV from '../config/Environment';
import fetchJsonp from 'fetch-jsonp';


export function getHashtagPhotos(tag) {
  console.log('getHashtagPhotos');
  console.log(tag)
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
