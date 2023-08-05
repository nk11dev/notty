import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { API_BASE_URL } from '@/app/constants/api.constants';
import type { AuthState, UserDto } from '@/app/auth/types';
import type { BaseQueryError } from '@/shared/types';

export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (_arg, thunkAPI) => {
    const response = await fetch(`${API_BASE_URL as string}/auth/logout`, {
      method: 'GET',
      credentials: 'include',
    });

    if (!response.ok) {
      return thunkAPI.rejectWithValue(`${response.status}: ${response.statusText}`);
    }
  }
);

const initialState: AuthState = {
  user: null,
  error: null,
  isAuthenticated: false,
  isUpdating: false,
  isError: false,
}

export const authSlice = createSlice({
  initialState,
  name: 'authSlice',
  reducers: {
    setAuthUpdating: () => ({
      ...initialState,
      isUpdating: true,
    }),
    setAuthSuccess: (_state, action: PayloadAction<UserDto>) => ({
      ...initialState,
      isAuthenticated: true,
      user: action.payload,
    }),
    setAuthError: (_state, action: PayloadAction<BaseQueryError>) => ({
      ...initialState,
      isError: true,
      error: action.payload,
    }),
    resetAuth: () => initialState,
  },
});