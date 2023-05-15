import { createApi } from '@reduxjs/toolkit/query/react';

import axiosBaseQuery from '@/shared/api/base-query';
import type { Note } from '@/entities/note/types';
import { sectionsApi } from '@/entities/section/api-slices';

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

        // Wait until the query is completed and refetch sections (to get current notes count)
        onCacheEntryAdded: async (_args, { cacheDataLoaded, dispatch }) => {
          await cacheDataLoaded;
          dispatch(sectionsApi.util.invalidateTags(
            ["Sections"]
          ));
        }
      }),

      deleteNote: build.mutation<Note, string>({
        query: (noteId) => ({
          url: `/notes/${noteId}`,
          method: 'DELETE'
        }),
        invalidatesTags: ['Notes'],

        // Wait until the query is completed and refetch sections (to get current notes count)
        onCacheEntryAdded: async (_args, { cacheDataLoaded, dispatch }) => {
          await cacheDataLoaded;
          dispatch(sectionsApi.util.invalidateTags(
            ["Sections"]
          ));
        }
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