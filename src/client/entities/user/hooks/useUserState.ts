import { useSelector } from 'react-redux';

import type { RootState } from '@/app/redux/store';
import type { UserState } from '@/entities/user/types';

export const useUserState = (): UserState => {
  return useSelector(
    (state: RootState) => state.userState
  );
}