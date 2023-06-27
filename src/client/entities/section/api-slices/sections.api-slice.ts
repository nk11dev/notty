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
      getAllFolders: build.query<Section[], void>({
        query: () => ({
          url: '/sections',
          method: 'GET'
        }),
        providesTags: ['FoldersTag'],
      }),

      getFolder: build.query<Section, string>({
        query: (id) => ({
          url: `/sections/${id}`,
          method: 'GET'
        }),
        providesTags: ['FolderTag'],
      }),

      createFolder: build.mutation<Section, void>({
        query: () => ({
          url: `/sections`,
          method: 'POST'
        }),
        invalidatesTags: ['FoldersTag'],
      }),

      updateFolder: build.mutation<Section, SectionUpdateEndpointArg>({
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

      deleteFolder: build.mutation<SectionDeleteResponse, string>({
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
  useGetAllFoldersQuery,
  useLazyGetAllFoldersQuery,
  useGetFolderQuery,
  useCreateFolderMutation,
  useUpdateFolderMutation,
  useDeleteFolderMutation,
} = foldersApi;