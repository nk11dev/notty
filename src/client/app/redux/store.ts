import { configureStore } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';

import { foldersApi } from '@/entities/folder/api-slices';
import { notesApi } from '@/entities/note/api-slices';

const logger = createLogger({
  collapsed: (_getState, action) => !action.error
});

export const store = configureStore({
  reducer: {
    [foldersApi.reducerPath]: foldersApi.reducer,
    [notesApi.reducerPath]: notesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      foldersApi.middleware,
      notesApi.middleware,
      logger
    ]),
});

export type RootState = ReturnType<typeof store.getState>;