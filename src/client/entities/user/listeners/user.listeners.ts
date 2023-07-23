import { isAnyOf } from '@reduxjs/toolkit';

import type { AppStartListening } from '@/app/redux/middlewares/listener.middleware';
import userSlice from '@/entities/user/slices/user.slice';
import { authApi } from '@/entities/user/slices';

const {
  setAuthUpdating,
  setAuthSuccess,
  setAuthError,
  resetAuth,
} = userSlice.actions;

const {
  getUserProfile,
  loginUser,
  logoutUser,
} = authApi.endpoints;

export const listenAuthUpdating = (startListening: AppStartListening) => startListening({
  matcher: isAnyOf(
    loginUser.matchPending,
    getUserProfile.matchPending,
  ),
  effect: async (_action, listenerApi) => {
    listenerApi.dispatch(setAuthUpdating());
  },
})

export const listenAuthSuccess = (startListening: AppStartListening) => startListening({
  matcher: isAnyOf(
    loginUser.matchFulfilled,
    getUserProfile.matchFulfilled,
  ),
  effect: async ({ payload }, listenerApi) => {
    listenerApi.dispatch(setAuthSuccess(payload));
  },
})

export const listenAuthError = (startListening: AppStartListening) => startListening({
  matcher: isAnyOf(
    loginUser.matchRejected,
    logoutUser.matchRejected,
    getUserProfile.matchRejected,
  ),
  effect: async (action, listenerApi) => {
    listenerApi.dispatch(setAuthError(action.payload));
  },
})

export const listenAuthReset = (startListening: AppStartListening) => startListening({
  matcher: logoutUser.matchFulfilled,
  effect: async (_action, listenerApi) => {
    listenerApi.dispatch(resetAuth());
  },
})