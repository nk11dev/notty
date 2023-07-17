import { createApi } from '@reduxjs/toolkit/query/react';

import type {
  UserCreatePayload,
  UserLoginPayload,
} from '@/common/types/user.types';

import {
  setUserData,
  setUserError,
  resetUser,
} from '@/entities/user/slices/user.slice';
import type { UserDto } from '@/entities/user/types';
import axiosBaseQuery from '@/shared/api/base-query';

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
        transformResponse: (result: { user: UserDto }) => result.user,
        async onQueryStarted(_args, { dispatch, queryFulfilled }) {
          try {
            const { data } = await queryFulfilled;
            dispatch(setUserData(data));

          } catch (error) {
            dispatch(setUserError(error));
          }
        },
      }),

      logoutUser: build.mutation<void, void>({
        query: () => ({
          url: '/auth/logout',
          method: 'GET',
        }),
        async onQueryStarted(_args, { dispatch, queryFulfilled }) {
          try {
            await queryFulfilled;
            dispatch(resetUser());

          } catch (error) {
            dispatch(setUserError(error));
          }
        },
      }),
    }
  },
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useLogoutUserMutation,
} = authApi;