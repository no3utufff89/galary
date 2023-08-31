import { configureStore } from '@reduxjs/toolkit';
import tokenSlice from './slice/tokenSlice';
import authReducer from './slice/authSlice';
import photosReducer from './slice/photosSlice';
import pictureSlice from './slice/pictureSlice';

export const store = configureStore({
  reducer: {
    token: tokenSlice,
    auth: authReducer,
    photos: photosReducer,
    picture: pictureSlice,
  },
  middleware: (getDefaultMiddleware => getDefaultMiddleware()),
});
