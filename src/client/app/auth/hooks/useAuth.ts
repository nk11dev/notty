import { useSelector } from 'react-redux';

import type { AuthState } from '@/app/auth/types';
import type { RootState } from '@/app/redux/store';

export const useAuth = (): AuthState => {
  return useSelector(
    (state: RootState) => state.authState
  );
}