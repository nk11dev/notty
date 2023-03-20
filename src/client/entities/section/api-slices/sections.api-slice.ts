import { createApi } from '@reduxjs/toolkit/query/react';

import axiosBaseQuery from '@/shared/api/base-query';
import type { Section } from '@/entities/section/types';

type SectionUpdateArgs = {
  id: string,
  title: string
};

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

      updateSection: build.mutation<Section, SectionUpdateArgs>({
        query: ({ id, title }) => ({
          url: `/sections/${id}`,
          method: 'PUT',
          data: {
            title,
          },
          headers: { 'content-type': 'application/json' },
        }),
        invalidatesTags: ['Sections'],
      }),

      deleteSection: build.mutation<Section, string>({
        query: (sectionId) => ({
          url: `/sections/${sectionId}`,
          method: 'DELETE'
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
  useUpdateSectionMutation,
  useDeleteSectionMutation,
} = sectionsApi;