import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ACCESS_KEY, API_URL } from '../../api/const';
import axios from 'axios';

const initialState = {
  picture: {},
  likes: 0,
  liked: false,
  status: '',
  error: '',
};

export const getPhotoData = createAsyncThunk(
  'picture/getPhotoData',
  (id, { getState }) => {
    const token = getState().token.token;
    const headers = {};
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
    return axios(`${API_URL}/photos/${id}?client_id=${ACCESS_KEY}`, { headers })
      .then(({
        data: {
          downloads,
          description,
          views,
          likes,
          created_at: created,
          liked_by_user: likedByUser,
          urls: {
            regular: image,
          },
          links: {
            html: selfUrl,
          },
          user: {
            name,
            profile_image: {
              small: profileImage,
            },
          },
        },
      }) => {
        const data = {
          downloads,
          description,
          views,
          image,
          name,
          likes,
          likedByUser,
          profileImage,
          selfUrl,
          created,
        };
        return data;
      })
      .catch((error) => (error.toString()));
  },
);

export const pictureSlice = createSlice({
  name: 'picture',
  initialState,
  reducers: {
    openNewPhoto: (state) => {
      state.picture = {};
    },
    changeLike: state => {
      state.liked = !state.liked;
      state.likes += state.liked ? 1 : -1;
    },
  },
  extraReducers: {
    [getPhotoData.pending]: (state) => {
      state.error = '';
      state.status = 'loading';
    },
    [getPhotoData.fulfilled]: (state, action) => {
      state.error = '';
      state.status = 'ready';
      state.picture = action.payload;
      state.likes = action.payload?.likes || 0;
      state.liked = action.payload?.likedByUser || false;
    },
    [getPhotoData.rejected]: (state, action) => {
      state.error = 'error';
      state.status = action.payload;
    },
  },
});

export const {
  openNewPhoto,
  changeLike,
} = pictureSlice.actions;
export default pictureSlice.reducer;
