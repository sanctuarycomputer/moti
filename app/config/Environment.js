let ENV = {};

if (!process.env.NODE_ENV) {
  ENV = {
    GOOGLE_API_KEY: 'AIzaSyBwwoS3UiNVFOQhNLs252QgrbFZXDxs8pw',
    GOOGLE_API_ENDPOINT: 'https://www.googleapis.com/customsearch/v1',
    GOOGLE_SEARCH_ID: '008307204988064030709:yirhplesr_4',
    INSTAGRAM_CLIENT_ID: '965fc4549fa04e5f9a4615435bb9ecdc',
    OAUTH_REDIRECT_URI: 'http://museumoftheinternet.dev:8080/',
    INSTAGRAM_API_ENDPOINT: 'https://api.instagram.com',
    FIREBASE_ROOT_URL: 'incandescent-fire-671.firebaseIO.com'
  }
} else {
  ENV = {
    GOOGLE_API_KEY: 'AIzaSyBwwoS3UiNVFOQhNLs252QgrbFZXDxs8pw',
    GOOGLE_API_ENDPOINT: 'https://www.googleapis.com/customsearch/v1',
    GOOGLE_SEARCH_ID: '008307204988064030709:yirhplesr_4',
    INSTAGRAM_CLIENT_ID: '965fc4549fa04e5f9a4615435bb9ecdc',
    OAUTH_REDIRECT_URI: 'https://incandescent-fire-671.firebaseapp.com/',
    INSTAGRAM_API_ENDPOINT: 'https://api.instagram.com',
    FIREBASE_ROOT_URL: 'incandescent-fire-671.firebaseIO.com'
  }
}

export default ENV;
