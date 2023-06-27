import { notesApi } from '@/entities/note/api-slices';

export const useNotesState = (folderId: string) => {
  return notesApi.endpoints.getNotesByFolder.useQueryState(folderId);
};