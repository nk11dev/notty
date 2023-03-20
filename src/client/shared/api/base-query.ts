import axios from 'axios';
import type { AxiosRequestConfig, AxiosError } from 'axios';
import type { BaseQueryFn } from '@reduxjs/toolkit/query';

import { API_BASE_URL } from '@/app/constants/api.constants';

const axiosBaseQuery =
  (
    { baseUrl }: { baseUrl: string } = { baseUrl: API_BASE_URL }
  ): BaseQueryFn<
    {
      url: string
      method: AxiosRequestConfig['method']
      data?: AxiosRequestConfig['data']
      params?: AxiosRequestConfig['params']
    },
    unknown,
    unknown
  > =>
    async (args) => {
      const { url, method, data, params } = args;

      console.log('\n axiosBaseQuery:', args);

      try {
        const result = await axios({
          url: baseUrl + url,
          method,
          data,
          params
        });

        return { data: result.data.payload };

      } catch (axiosError) {
        const err = axiosError as AxiosError;

        return {
          error: {
            status: err.response?.status,
            statusText: err.response?.statusText,
            message: err.response?.data || err.message,
          },
        };
      }
    }

export default axiosBaseQuery;