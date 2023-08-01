import { createApi } from '@reduxjs/toolkit/query/react';

import type {
  UserRegisterPayload,
  UserLoginPayload,
} from '@/common/types/user.types';

import type { UserDto } from '@/entities/user/types';
import customBaseQuery from '@/shared/api/base-query';

export const REGISTER_USER_CACHE_KEY = 'REGISTER_USER_CACHE_KEY';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: customBaseQuery,
  endpoints(build) {
    return {
      registerUser: build.mutation<UserDto, UserRegisterPayload>({
        query: (body) => ({
          url: '/auth/register',
          method: 'POST',
          body,
        }),
        transformResponse: (result: { user: UserDto }) => result.user,
      }),

      loginUser: build.mutation<UserDto, UserLoginPayload>({
        query: (body) => ({
          url: '/auth/login',
          method: 'POST',
          body,
        }),
        transformResponse: (result: { user: UserDto }) => result.user,
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
} = authApi;