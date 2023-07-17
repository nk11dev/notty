import { configureStore } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';

import userReducer from '@/entities/user/slices/user.slice';
import { authApi } from '@/entities/user/slices';
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
    userState: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      authApi.middleware,
      foldersApi.middleware,
      notesApi.middleware,
      logger
    ]),
});

export type RootState = ReturnType<typeof store.getState>;