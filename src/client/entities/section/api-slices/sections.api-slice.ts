import { createApi } from '@reduxjs/toolkit/query/react';

import axiosBaseQuery from '@/shared/api/base-query';
import type {
  Section,
  SectionUpdateEndpointArg,
  SectionDeleteResponse
} from '@/entities/section/types';

export const foldersApi = createApi({
  reducerPath: 'foldersApi',
  baseQuery: axiosBaseQuery(),
  tagTypes: ['FoldersTag', 'FolderTag'],
  endpoints(build) {
    return {
      getAllSections: build.query<Section[], void>({
        query: () => ({
          url: '/sections',
          method: 'GET'
        }),
        providesTags: ['FoldersTag'],
      }),

      getSection: build.query<Section, string>({
        query: (id) => ({
          url: `/sections/${id}`,
          method: 'GET'
        }),
        providesTags: ['FolderTag'],
      }),

      createSection: build.mutation<Section, void>({
        query: () => ({
          url: `/sections`,
          method: 'POST'
        }),
        invalidatesTags: ['FoldersTag'],
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
        invalidatesTags: ['FoldersTag'],
      }),

      deleteSection: build.mutation<SectionDeleteResponse, string>({
        query: (id) => ({
          url: `/sections/${id}`,
          method: 'DELETE'
        }),
        invalidatesTags: ['FoldersTag'],
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
} = foldersApi;