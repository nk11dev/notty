import { createApi } from '@reduxjs/toolkit/query/react';

import axiosBaseQuery from '@/shared/api/base-query';
import type { Section } from '@/entities/section/types';

export const sectionsApi = createApi({
  reducerPath: 'sectionsApi',
  baseQuery: axiosBaseQuery(),
  tagTypes: ['Sections'],
  endpoints(build) {
    return {
      getAllSections: build.query<Section[], void>({
        query: () => ({
          url: '/sections',
          method: 'GET'
        }),
        providesTags: ['Sections'],
      }),
      getSection: build.query<Section, string>({
        query: (sectionId) => ({
          url: `/sections/${sectionId}`,
          method: 'GET'
        })
      }),
      createSection: build.mutation<Section, void>({
        query: () => ({
          url: `/sections`,
          method: 'POST'
        }),
        invalidatesTags: ['Sections'],
      }),
    }
  },
});

export const { 
  useGetAllSectionsQuery,
  useLazyGetAllSectionsQuery,
  useGetSectionQuery,
  useCreateSectionMutation,
 } = sectionsApi;