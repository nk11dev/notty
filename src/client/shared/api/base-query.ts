import { fetchBaseQuery } from '@reduxjs/toolkit/query'
import type { BaseQueryFn, FetchArgs } from '@reduxjs/toolkit/query'

import { API_BASE_URL } from '@/app/constants/api.constants';
import type { BaseQueryError, ApiResponseError, ApiResponseSuccess } from '@/shared/types';
import { log } from '@/shared/utils/log.utils';

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

  const result = await rawBaseQuery(args, api, extraOptions);

  log({
    msg: `--- ${args.method} ${args.url}`,
    data: result,
    theme: result.error ? 'salmon' : 'green',
  });

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