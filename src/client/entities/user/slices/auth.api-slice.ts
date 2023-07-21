import { createApi } from '@reduxjs/toolkit/query/react';

import type {
  UserRegisterPayload,
  UserLoginPayload,
} from '@/common/types/user.types';

import type { UserDto } from '@/entities/user/types';
import axiosBaseQuery from '@/shared/api/base-query';

export const REGISTER_USER_CACHE_KEY = 'REGISTER_USER_CACHE_KEY';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: axiosBaseQuery(),
  endpoints(build) {
    return {
      registerUser: build.mutation<UserDto, UserRegisterPayload>({
        query: (data) => ({
          url: '/auth/register',
          method: 'POST',
          data,
        }),
        transformResponse: (result: { user: UserDto }) => result.user,
      }),

      loginUser: build.mutation<UserDto, UserLoginPayload>({
        query: (data) => ({
          url: '/auth/login',
          method: 'POST',
          data,
        }),
        transformResponse: (result: { user: UserDto }) => result.user,
      }),

      logoutUser: build.mutation<void, void>({
        query: () => ({
          url: '/auth/logout',
          method: 'GET',
        }),
      }),

      getUserProfile: build.query<UserDto, void>({
        query: () => ({
          url: '/auth/profile',
          method: 'GET',
        }),
      }),
    }
  },
});

export const {
  useGetUserProfileQuery,
  useRegisterUserMutation,
  useLoginUserMutation,
  useLogoutUserMutation,
} = authApi;