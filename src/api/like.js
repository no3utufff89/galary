import { ACCESS_KEY, API_URL } from './const';
import axios from 'axios';

export const likeUpdate = (id, token, liked) => {
  const url = new URL(`${API_URL}/photos/${id}/like?client_id=${ACCESS_KEY}`);
  if (!token) return;
  const method = liked ? 'DELETE' : 'POST';
  axios(url.href, {
    method,
    headers: { Authorization: `Bearer ${token}` },
  })
    .catch(error => ({ error: error.toString() }));
};
