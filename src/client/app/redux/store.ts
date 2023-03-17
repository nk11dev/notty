import { configureStore } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';

import { sectionsApi } from '@/entities/section/api-slices';

const logger = createLogger({
  collapsed: (_getState, action) => !action.error
});

export const store = configureStore({
  reducer: {
    [sectionsApi.reducerPath]: sectionsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      sectionsApi.middleware,
      logger
    ]),
});

export type RootState = ReturnType<typeof store.getState>;