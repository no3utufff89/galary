import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  data: [],
}
export const likeSlice = createSlice({
  name: 'like',
  initialState,
  reducers: {},
  extraReducers: {},
});

export default likeSlice.reducer;
