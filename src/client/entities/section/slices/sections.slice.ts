import { createSlice } from '@reduxjs/toolkit'

export const sectionsSlice = createSlice({
  name: 'sections',
  initialState: {
    data: null,
    isLoading: false,
    error: null,
  },
  reducers: {
  },
});

export default sectionsSlice.reducer;