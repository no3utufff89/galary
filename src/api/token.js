// Добавить токен в LS
import {
  ACCESS_KEY,
  API_URL_TOKEN,
  REDIRECT_URI,
  SECRET_KEY,
} from './const';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setTokenToState } from '../store/slice/tokenSlice';
import { useNavigate } from 'react-router';

export const setToken = token => {
  localStorage.setItem('Bearer', token);
};

export const clearLs = () => {
  localStorage.removeItem('Bearer');
};

// Получить тот самый токен
export const getToken = () => {
  let token = '';
  const navigate = useNavigate();
  const dispatch = useDispatch();
  if (location.search.includes('code')) {
    const code = new URLSearchParams(location.search).get('code');
    const tokenRequestUrl = new URL(API_URL_TOKEN);
    tokenRequestUrl.searchParams.append('client_id', ACCESS_KEY);
    tokenRequestUrl.searchParams.append('client_secret', SECRET_KEY);
    tokenRequestUrl.searchParams.append('redirect_uri', REDIRECT_URI);
    tokenRequestUrl.searchParams.append('code', code);
    tokenRequestUrl.searchParams.append('grant_type', 'authorization_code');

    axios
      .post(tokenRequestUrl.toString())
      .then((data => {
        const token = data.data.access_token;
        setToken(token);
        dispatch(setTokenToState(token));
        navigate('/');
      }))
      .catch(error => {
        console.error('Произошла ошибка получения токена: ', error.message);
      });
  }

  if (localStorage.getItem('Bearer')) {
    token = localStorage.getItem('Bearer');
  }

  return token;
};
