import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL } from '../../api/const';

const initialState = {
  loading: false,
  data: {},
  error: null,
};

export const authRequest = createAsyncThunk(
  'auth/authRequest',
  (token, { rejectWithValue }) => {
    try {
      if (!token) return;
      return axios(`${API_URL}/me`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
        .then(({
          data: {
            name,
            profile_image: {
              medium: image,
            },
            username,
          },
        }) => {
          const data = { name, image, username };
          return data;
        });
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authLogout: (state) => {
      state.data = {};
    },
  },
  extraReducers: {
    [authRequest.pending]: (state) => {
      state.loading = true;
      state.error = '';
    },
    [authRequest.fulfilled]: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    [authRequest.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});
export const { authLogout } = authSlice.actions;
export default authSlice.reducer;
