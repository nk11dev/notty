import { TypedStartListening, createListenerMiddleware } from '@reduxjs/toolkit';

import type { RootState, AppDispatch } from '@/app/redux/store';
import * as userListeners from '@/entities/user/listeners';

export const listenerMiddleware = createListenerMiddleware();

export type AppStartListening = TypedStartListening<RootState, AppDispatch>

Object.values(userListeners).forEach((listener) => {
  listener(listenerMiddleware.startListening as AppStartListening);
});