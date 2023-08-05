import { fetchBaseQuery } from '@reduxjs/toolkit/query';
import type { BaseQueryFn, FetchArgs } from '@reduxjs/toolkit/query';
import { Mutex } from 'async-mutex';

import { HttpStatus } from '@/common/constants';

import type { RootState } from '@/app/redux/store';
import { API_BASE_URL } from '@/app/constants/api.constants';
import { logoutUser } from '@/entities/user/slices/user.slice';
import type { BaseQueryError, ApiResponseError, ApiResponseSuccess } from '@/shared/types';
import { log } from '@/shared/utils/log.utils';

// create mutex to prevent multiple calls to '/auth/refresh' when multiple calls fail with 401 Unauthorized errors.
const mutex = new Mutex();

const rawBaseQuery = fetchBaseQuery({
  baseUrl: API_BASE_URL as string,
  credentials: 'include',
});

const customBaseQuery: BaseQueryFn<
  FetchArgs,
  unknown,
  BaseQueryError
> = async (args, api, extraOptions) => {

  log({
    msg: `--- ${args.method} ${args.url}`,
    theme: 'violet',
  });

  // wait until the mutex is available and make query
  await mutex.waitForUnlock();

  let result = await rawBaseQuery(args, api, extraOptions);

  // check for 401 Unauthorized errors
  if (
    result.error &&
    result.error.status === HttpStatus.UNAUTHORIZED
  ) {

    // checking whether the mutex is already locked
    if (!mutex.isLocked()) {

      // lock the mutex to try to make a request to refresh access token
      const release = await mutex.acquire();

      try {
        const refreshResult = await rawBaseQuery({
          url: '/auth/refresh',
          method: 'GET',
        }, api, extraOptions);

        log({
          msg: `--- GET /auth/refresh, result:`,
          data: refreshResult,
          theme: refreshResult.error ? 'salmon' : 'blue',
        });

        if (refreshResult?.meta?.response?.ok) {

          // retry the original query (because now we are probably authenticated again)
          result = await rawBaseQuery(args, api, extraOptions);

        } else {
          const { userState } = <RootState>api.getState();

          if (userState.isAuthenticated) {
            api.dispatch(logoutUser());
          }
        }

      } finally {
        // release must be called once the mutex should be released again.
        release();
      }

    } else {
      // wait for the already locked mutex (after that, a new access token should already have been obtained) and then retry the original query
      await mutex.waitForUnlock();
      result = await rawBaseQuery(args, api, extraOptions);
    }
  }

  log({
    msg: `--- ${args.method} ${args.url}, result:`,
    data: result,
    theme: result.error ? 'salmon' : 'green',
  });

  // process the final result of the original request
  if (result.error) {
    const { error } = result;
    const responseError = error?.data as ApiResponseError;

    return {
      error: {
        status: error.status,
        data: responseError?.error || responseError,
      },
    };

  } else {
    const responseSuccess = result.data as ApiResponseSuccess;

    return {
      data: responseSuccess?.payload || responseSuccess
    };
  }

};

export default customBaseQuery;