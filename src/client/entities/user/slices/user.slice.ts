import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import type { UserState, UserDto, } from '@/entities/user/types';
import type { BaseQueryError } from '@/shared/types';

const initialState: UserState = {
  data: null,
  error: null,
  isAuthenticated: false,
  isUpdating: false,
  isError: false,
}

function getInitialState() {
  const data = localStorage.getItem('userProfile');

  return data
    ? {
      ...initialState,
      isAuthenticated: true,
      data: JSON.parse(data),
    }
    : initialState
}

const userSlice = createSlice({
  initialState: getInitialState(),
  name: 'userSlice',
  reducers: {
    setAuthUpdating: () => ({
      ...initialState,
      isUpdating: true,
    }),
    setAuthSuccess: (_state, action: PayloadAction<UserDto>) => ({
      ...initialState,
      isAuthenticated: true,
      data: action.payload,
    }),
    setAuthError: (_state, action: PayloadAction<BaseQueryError>) => ({
      ...initialState,
      isError: true,
      error: action.payload,
    }),
    resetAuth: () => initialState,
  },
});

export default userSlice;