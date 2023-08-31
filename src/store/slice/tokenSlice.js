import { createSlice } from '@reduxjs/toolkit';

const tokenSlice = createSlice({
  name: 'token',
  initialState: {
    token: '',
  },
  reducers: {
    setTokenToState(state, action) {
      state.token = action.payload;
    },
    deleteToken(state) {
      state.token = '';
    },
  },
});

export default tokenSlice.reducer;
export const { setTokenToState, deleteToken } = tokenSlice.actions;
