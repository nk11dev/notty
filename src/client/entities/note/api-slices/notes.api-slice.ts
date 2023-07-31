import { createApi } from '@reduxjs/toolkit/query/react';

import customBaseQuery from '@/shared/api/base-query';
import type {
  NoteDto,
  NoteUpdateEndpointArg,
  NoteDeleteResponse
} from '@/entities/note/types';

import { foldersApi } from '@/entities/folder/api-slices';

export const notesApi = createApi({
  reducerPath: 'notesApi',
  baseQuery: customBaseQuery,
  tagTypes: ['NoteTag', 'NotesTag'],
  endpoints(build) {
    return {
      getBookmarks: build.query<NoteDto[], void>({
        query: () => ({
          url: '/notes?filterByIsBookmark=true',
          method: 'GET',
        }),
        providesTags: ['NotesTag'],
      }),

      getNotesByFolder: build.query<NoteDto[], string>({
        query: (folderId) => ({
          url: `/folders/${folderId}/notes`,
          method: 'GET'
        }),
        providesTags: ['NotesTag'],
      }),

      getNote: build.query<NoteDto, string>({
        query: (id) => ({
          url: `/notes/${id}`,
          method: 'GET'
        }),
        providesTags: ['NoteTag'],
      }),

      createNote: build.mutation<NoteDto, string>({
        query: (folderId) => ({
          url: `/folders/${folderId}/notes`,
          method: 'POST'
        }),
        invalidatesTags: ['NotesTag'],

        // Wait until the query is completed and refetch related data (to get current notes count)
        onQueryStarted: async (_args, { queryFulfilled, dispatch, }) => {
          await queryFulfilled;
          dispatch(foldersApi.util.invalidateTags(
            ['FoldersTag']
          ));
        }
      }),

      updateNote: build.mutation<NoteDto, NoteUpdateEndpointArg>({
        query: ({ id, ...fields }) => ({
          url: `/notes/${id}`,
          method: 'PUT',
          body: {
            ...fields,
          },
          headers: { 'content-type': 'application/json' },
        }),
        invalidatesTags: ['NoteTag', 'NotesTag'],
      }),

      deleteNote: build.mutation<NoteDeleteResponse, string>({
        query: (id) => ({
          url: `/notes/${id}`,
          method: 'DELETE'
        }),
        invalidatesTags: ['NotesTag'],

        // Wait until the query is completed and refetch related data (to get current notes count)
        onQueryStarted: async (_args, { queryFulfilled, dispatch }) => {
          await queryFulfilled;
          dispatch(foldersApi.util.invalidateTags(
            ['FoldersTag', 'FolderTag']
          ));
        }
      }),
    }
  },
});

export const {
  useGetBookmarksQuery,
  useLazyGetBookmarksQuery,
  useGetNotesByFolderQuery,
  useLazyGetNotesByFolderQuery,
  useGetNoteQuery,
  useCreateNoteMutation,
  useUpdateNoteMutation,
  useDeleteNoteMutation,
} = notesApi;