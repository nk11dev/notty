import { createApi } from '@reduxjs/toolkit/query/react';

import axiosBaseQuery from '@/shared/api/base-query';
import type { Note } from '@/entities/note/types';

export const notesApi = createApi({
  reducerPath: 'notesApi',
  baseQuery: axiosBaseQuery(),
  tagTypes: ['Notes'],
  endpoints(build) {
    return {
      getNotesBySection: build.query<Note[], string>({
        query: (sectionId) => ({
          url: `/sections/${sectionId}/notes`,
          method: 'GET'
        }),
        providesTags: ['Notes'],
      }),

      createNote: build.mutation<Note, string>({
        query: (sectionId) => ({
          url: `/sections/${sectionId}/notes`,
          method: 'POST'
        }),
        invalidatesTags: ['Notes'],
      }),

      deleteNote: build.mutation<Note, string>({
        query: (noteId) => ({
          url: `/notes/${noteId}`,
          method: 'DELETE'
        }),
        invalidatesTags: ['Notes'],
      }),
    }
  },
});

export const {
  useGetNotesBySectionQuery,
  useLazyGetNotesBySectionQuery,
  useCreateNoteMutation,
  useDeleteNoteMutation,
} = notesApi;