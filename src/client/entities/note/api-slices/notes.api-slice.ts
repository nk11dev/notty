import { createApi } from '@reduxjs/toolkit/query/react';

import axiosBaseQuery from '@/shared/api/base-query';
import type {
  Note,
  NoteUpdateEndpointArg,
  NoteDeleteResponse
} from '@/entities/note/types';

import { foldersApi } from '@/entities/section/api-slices';

export const notesApi = createApi({
  reducerPath: 'notesApi',
  baseQuery: axiosBaseQuery(),
  tagTypes: ['Note', 'Notes'],
  endpoints(build) {
    return {
      getBookmarks: build.query<Note[], void>({
        query: () => ({
          url: '/notes?filterByIsBookmark=true',
          method: 'GET',
        }),
        providesTags: ['Notes'],
      }),

      getNotesBySection: build.query<Note[], string>({
        query: (folderId) => ({
          url: `/sections/${folderId}/notes`,
          method: 'GET'
        }),
        providesTags: ['Notes'],
      }),

      getNote: build.query<Note, string>({
        query: (id) => ({
          url: `/notes/${id}`,
          method: 'GET'
        }),
        providesTags: ['Note'],
      }),

      createNote: build.mutation<Note, string>({
        query: (folderId) => ({
          url: `/sections/${folderId}/notes`,
          method: 'POST'
        }),
        invalidatesTags: ['Notes'],

        // Wait until the query is completed and refetch sections (to get current notes count)
        onCacheEntryAdded: async (_args, { cacheDataLoaded, dispatch }) => {
          await cacheDataLoaded;
          dispatch(foldersApi.util.invalidateTags(
            ["Sections"]
          ));
        }
      }),

      updateNote: build.mutation<Note, NoteUpdateEndpointArg>({
        query: ({ id, ...fields }) => ({
          url: `/notes/${id}`,
          method: 'PUT',
          data: {
            ...fields,
          },
          headers: { 'content-type': 'application/json' },
        }),
        invalidatesTags: ['Note', 'Notes'],
      }),

      deleteNote: build.mutation<NoteDeleteResponse, string>({
        query: (id) => ({
          url: `/notes/${id}`,
          method: 'DELETE'
        }),
        invalidatesTags: ['Notes'],

        // Wait until the query is completed and refetch sections and section (to get current notes count)
        onCacheEntryAdded: async (_args, { cacheDataLoaded, dispatch }) => {
          await cacheDataLoaded;
          dispatch(foldersApi.util.invalidateTags(
            ['Sections', 'Section']
          ));
        }
      }),
    }
  },
});

export const {
  useGetBookmarksQuery,
  useLazyGetBookmarksQuery,
  useGetNotesBySectionQuery,
  useLazyGetNotesBySectionQuery,
  useGetNoteQuery,
  useCreateNoteMutation,
  useUpdateNoteMutation,
  useDeleteNoteMutation,
} = notesApi;