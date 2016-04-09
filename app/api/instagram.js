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
