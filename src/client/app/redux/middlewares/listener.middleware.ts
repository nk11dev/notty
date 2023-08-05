import { TypedStartListening, createListenerMiddleware } from '@reduxjs/toolkit';

import * as userListeners from '@/app/auth/listeners';
import type { RootState, AppDispatch } from '@/app/redux/store';

export const listenerMiddleware = createListenerMiddleware();

export type AppStartListening = TypedStartListening<RootState, AppDispatch>

Object.values(userListeners).forEach((listener) => {
  listener(listenerMiddleware.startListening as AppStartListening);
});