let ENV = {};

if (!process.env.NODE_ENV) {
  ENV = {
    INSTAGRAM_CLIENT_ID: '965fc4549fa04e5f9a4615435bb9ecdc',
    OAUTH_REDIRECT_URI: 'museumoftheinternet.dev:8080',
    INSTAGRAM_API_ENDPOINT: 'https://api.instagram.com',
    FIREBASE_ROOT_URL: 'incandescent-fire-671.firebaseIO.com'
  }
} else {
  ENV = {
    INSTAGRAM_CLIENT_ID: '965fc4549fa04e5f9a4615435bb9ecdc',
    OAUTH_REDIRECT_URI: 'https://incandescent-fire-671.firebaseapp.com',
    INSTAGRAM_API_ENDPOINT: 'https://api.instagram.com',
    FIREBASE_ROOT_URL: 'incandescent-fire-671.firebaseIO.com'
  }
}

console.log(ENV);
console.log(process.env.NODE_ENV)

export default ENV;
