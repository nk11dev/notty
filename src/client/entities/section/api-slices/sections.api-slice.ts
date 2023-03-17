import { createApi } from '@reduxjs/toolkit/query/react';

import axiosBaseQuery from '@/shared/api/base-query';
import { Section } from '@/entities/section/types';

export const sectionsApi = createApi({
  reducerPath: 'sectionsApi',
  baseQuery: axiosBaseQuery(),
  endpoints(build) {
    return {
      getSections: build.query<Section[], void>({
        query: () => ({
          url: '/sections',
          method: 'GET'
        })
      }),
    }
  },
});

export const { 
  useGetSectionsQuery,
  useLazyGetSectionsQuery,
 } = sectionsApi;