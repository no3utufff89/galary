export const API_URL = 'https://api.unsplash.com';
export const API_URL_AUTH = 'https://unsplash.com/oauth/authorize?';
export const API_URL_TOKEN = 'https://unsplash.com/oauth/token?';
export const ACCESS_KEY = process.env.REACT_APP_ACCESS_KEY;
export const SECRET_KEY = process.env.REACT_APP_SECRET_KEY;
export const REDIRECT_URI = 'http://192.168.1.42:3000';
export const RESPONSE_TYPE = 'code';
export const SCOPE = 'public read_user read_photos write_likes';

export const urlToken = new URL(API_URL_TOKEN);

urlToken.searchParams.append('client_id', ACCESS_KEY);
urlToken.searchParams.append('client_secret', SECRET_KEY);
urlToken.searchParams.append('redirect_uri', REDIRECT_URI);
urlToken.searchParams.append('grant_type', 'authorization_code');
