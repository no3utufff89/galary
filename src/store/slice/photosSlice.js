import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { ACCESS_KEY, API_URL } from '../../api/const';

const initialState = {
  photos: [],
  error: '',
  loading: false,
  page: 1,
};

export const fetchPhotos = createAsyncThunk(
  'posts/axios', (_, { getState }) => {
    const photos = getState().photos.photos;
    const page = getState().photos.page;
    const token = getState().token.token;
    const headers = {};
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    return axios(`${API_URL}/photos?client_id=${ACCESS_KEY}&
  ${page ? `page=${page}` : ''}&per_page=30`, { headers })
      .then(data => {
        let newPosts = data.data;
        if (page > 1) {
          newPosts = [...photos, ...newPosts];
        }
        return newPosts;
      })
      .catch(error => ({ error: error.toString() }));
  });

export const photosSlice = createSlice({
  name: 'photos',
  initialState,
  reducers: {
    changePage: (state) => {
      state.page += 1;
    },
    changeLike: (state, action) => {
      const elem = state.photos.find(el => el.id === action.payload);
      elem.likes += elem.liked_by_user ? -1 : 1;
      elem.liked_by_user = !elem.liked_by_user;
    },
  },
  extraReducers: {
    [fetchPhotos.pending]: (state) => {
      state.loading = true;
      state.error = '';
    },
    [fetchPhotos.fulfilled]: (state, action) => {
      state.loading = false;
      state.photos = action.payload;
      state.error = '';
    },
    [fetchPhotos.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});
export const { changePage, changeLike } = photosSlice.actions;
export default photosSlice.reducer;
