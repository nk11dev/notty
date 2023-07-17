import { createApi } from '@reduxjs/toolkit/query/react';

import axiosBaseQuery from '@/shared/api/base-query';
import type { UserDto } from '@/entities/user/types';
import type {
  UserCreatePayload,
  UserLoginPayload,
} from '@/common/types/user.types';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: axiosBaseQuery(),
  endpoints(build) {
    return {
      registerUser: build.mutation<UserDto, UserCreatePayload>({
        query: (data) => ({
          url: '/auth/register',
          method: 'POST',
          data,
        }),
      }),

      loginUser: build.mutation<UserDto, UserLoginPayload>({
        query: (data) => ({
          url: '/auth/login',
          method: 'POST',
          data,
        }),
      }),

      logoutUser: build.mutation<void, void>({
        query: () => ({
          url: '/auth/logout',
          method: 'GET',
        }),
      }),
    }
  },
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useLogoutUserMutation,
} = authApi;