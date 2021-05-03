import { createSlice } from '@reduxjs/toolkit';

export const categorySlice = createSlice({
  name: 'category',
  initialState: {
    category: null,
  },
  reducers: {
    fillForEdit: (state, action) => {
      state.category = action.payload;
    },
  },
});

export const { fillForEdit } = categorySlice.actions;

export const getForEdit = state => state.category.category;

export default categorySlice.reducer;
