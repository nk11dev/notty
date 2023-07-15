import axios from 'axios';
import type { AxiosRequestConfig, AxiosError } from 'axios';
import type { BaseQueryFn } from '@reduxjs/toolkit/query';

import { API_BASE_URL } from '@/app/constants/api.constants';
import { log } from '@/shared/utils/log.utils';
import type {
  BaseQueryError,
  ErrorResponse,
} from '@/shared/types';

const axiosBaseQuery =
  (
    { baseUrl }: { baseUrl: string } = { baseUrl: API_BASE_URL as string }
  ): BaseQueryFn<
    {
      url: string
      method: AxiosRequestConfig['method']
      data?: AxiosRequestConfig['data']
      params?: AxiosRequestConfig['params']
    },
    unknown,
    BaseQueryError
  > =>
    async (args) => {
      const { url, method, data, params } = args;

      log({
        msg: '--- axiosBaseQuery()',
        data: `${args.method} ${args.url}`,
        theme: 'violet',
      });

      log({
        msg: 'data',
        data: data,
        theme: 'gray',
        isDisabled: !data
      });

      try {
        const result = await axios({
          url: baseUrl + url,
          method,
          data,
          params,
          withCredentials: true,
        });

        return { data: result.data.payload };

      } catch (axiosError) {
        const err = axiosError as AxiosError;
        const data = err?.response?.data as ErrorResponse;

        return {
          error: {
            status: err.response?.status,
            data: data?.error
            ? data.error
            : (data || err.message),
          },
        };
      }
    }

export default axiosBaseQuery;