import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { createLogger } from 'redux-logger';

import { listenerMiddleware } from '@/app/redux/middlewares';
import { authApi, authSlice } from '@/app/auth/slices';
import { foldersApi } from '@/entities/folder/api-slices';
import { notesApi } from '@/entities/note/api-slices';

const logger = createLogger({
  collapsed: (_getState, action) => !action.error
});

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [foldersApi.reducerPath]: foldersApi.reducer,
    [notesApi.reducerPath]: notesApi.reducer,
    authState: authSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat([
        listenerMiddleware.middleware,
        authApi.middleware,
        foldersApi.middleware,
        notesApi.middleware,
        logger
      ]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();