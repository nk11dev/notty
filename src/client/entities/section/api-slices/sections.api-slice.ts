import { createApi } from '@reduxjs/toolkit/query/react';

import axiosBaseQuery from '@/shared/api/base-query';
import type {
  Section,
  SectionUpdateEndpointArg,
  SectionDeleteResponse
} from '@/entities/section/types';

export const sectionsApi = createApi({
  reducerPath: 'sectionsApi',
  baseQuery: axiosBaseQuery(),
  tagTypes: ['Sections', 'Section'],
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
        }),
        providesTags: ['Section'],
      }),

      createSection: build.mutation<Section, void>({
        query: () => ({
          url: `/sections`,
          method: 'POST'
        }),
        invalidatesTags: ['Sections'],
      }),

      updateSection: build.mutation<Section, SectionUpdateEndpointArg>({
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

      deleteSection: build.mutation<SectionDeleteResponse, string>({
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