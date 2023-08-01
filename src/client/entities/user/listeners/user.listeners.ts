import { isAnyOf } from '@reduxjs/toolkit';

import type { AppStartListening } from '@/app/redux/middlewares/listener.middleware';
import userSlice, { logoutUser } from '@/entities/user/slices/user.slice';
import { authApi } from '@/entities/user/slices';
import { foldersApi } from '@/entities/folder/api-slices';
import { notesApi } from '@/entities/note/api-slices';

const {
  setAuthUpdating,
  setAuthSuccess,
  setAuthError,
  resetAuth,
} = userSlice.actions;

const {
  getUserProfile,
  loginUser,
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
    logoutUser.rejected,
    getUserProfile.matchRejected,
  ),
  effect: async (action, listenerApi) => {
    listenerApi.dispatch(setAuthError(action.payload));
  },
})

export const listenAuthReset = (startListening: AppStartListening) => startListening({
  actionCreator: logoutUser.fulfilled,
  effect: async (_action, listenerApi) => {
    listenerApi.dispatch(resetAuth());
    listenerApi.dispatch(authApi.util.resetApiState());
    listenerApi.dispatch(foldersApi.util.resetApiState());
    listenerApi.dispatch(notesApi.util.resetApiState());
  },
})