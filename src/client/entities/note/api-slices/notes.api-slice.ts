import { createApi } from '@reduxjs/toolkit/query/react';

import axiosBaseQuery from '@/shared/api/base-query';
import type {
  Note,
  NoteUpdateEndpointArg,
  NoteDeleteResponse
} from '@/entities/note/types';

import { sectionsApi } from '@/entities/section/api-slices';

export const notesApi = createApi({
  reducerPath: 'notesApi',
  baseQuery: axiosBaseQuery(),
  tagTypes: ['Note', 'Notes'],
  endpoints(build) {
    return {
      getFavorites: build.query<Note[], void>({
        query: () => ({
          url: '/notes?filterByIsFavorite=true',
          method: 'GET',
        }),
        providesTags: ['Notes'],
      }),

      getNotesBySection: build.query<Note[], string>({
        query: (sectionId) => ({
          url: `/sections/${sectionId}/notes`,
          method: 'GET'
        }),
        providesTags: ['Notes'],
      }),

      getNote: build.query<Note, string>({
        query: (noteId) => ({
          url: `/notes/${noteId}`,
          method: 'GET'
        }),
        providesTags: ['Note'],
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
  useGetFavoritesQuery,
  useLazyGetFavoritesQuery,
  useGetNotesBySectionQuery,
  useLazyGetNotesBySectionQuery,
  useGetNoteQuery,
  useCreateNoteMutation,
  useUpdateNoteMutation,
  useDeleteNoteMutation,
} = notesApi;