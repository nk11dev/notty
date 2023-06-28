import { createApi } from '@reduxjs/toolkit/query/react';

import axiosBaseQuery from '@/shared/api/base-query';
import type {
  FolderDto,
  FolderDeleteResponse
} from '@/entities/folder/types';

export const foldersApi = createApi({
  reducerPath: 'foldersApi',
  baseQuery: axiosBaseQuery(),
  tagTypes: ['FoldersTag', 'FolderTag'],
  endpoints(build) {
    return {
      getAllFolders: build.query<FolderDto[], void>({
        query: () => ({
          url: '/folders',
          method: 'GET'
        }),
        providesTags: ['FoldersTag'],
      }),

      getFolder: build.query<FolderDto, string>({
        query: (id) => ({
          url: `/folders/${id}`,
          method: 'GET'
        }),
        providesTags: ['FolderTag'],
      }),

      createFolder: build.mutation<FolderDto, void>({
        query: () => ({
          url: `/folders`,
          method: 'POST'
        }),
        invalidatesTags: ['FoldersTag'],
      }),

      updateFolder: build.mutation<FolderDto, Partial<FolderDto>>({
        query: ({ id, title }) => ({
          url: `/folders/${id}`,
          method: 'PUT',
          data: {
            title,
          },
          headers: { 'content-type': 'application/json' },
        }),
        invalidatesTags: ['FoldersTag'],
      }),

      deleteFolder: build.mutation<FolderDeleteResponse, string>({
        query: (id) => ({
          url: `/folders/${id}`,
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