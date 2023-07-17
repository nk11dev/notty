import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import type { UserState, UserDto, } from '@/entities/user/types';
import type { BaseQueryError } from '@/shared/types';

const initialState: UserState = {
  data: null,
  error: null,
  isAuthenticated: false,
  isError: false,
}

const userSlice = createSlice({
  initialState,
  name: 'userSlice',
  reducers: {
    setUserData: (_state, action: PayloadAction<UserDto>) => ({
      ...initialState,
      isAuthenticated: true,
      data: action.payload,
    }),
    setUserError: (_state, action: PayloadAction<BaseQueryError>) => ({
      ...initialState,
      isError: true,
      error: action.payload,
    }),
    resetUser: () => initialState,
  },
});

export default userSlice.reducer;

export const {
  setUserData,
  setUserError,
  resetUser,
} = userSlice.actions;