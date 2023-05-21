import { notesApi } from '@/entities/note/api-slices';

export const useNotesState = (sectionId: string) => {
  return notesApi.endpoints.getNotesBySection.useQueryState(sectionId);
};