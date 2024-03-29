import { notesApi } from '@/entities/note/api-slices';

export const useBookmarksState = () => {
  return notesApi.endpoints.getBookmarks.useQueryState();
};