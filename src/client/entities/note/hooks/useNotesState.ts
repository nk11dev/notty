import { notesApi } from '@/entities/note/api-slices';

export const useNotesState = (folderId: string) => {
  return notesApi.endpoints.getNotesBySection.useQueryState(folderId);
};