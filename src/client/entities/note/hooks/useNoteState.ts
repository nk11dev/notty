import { notesApi } from '@/entities/note/api-slices';

export const useNoteState = (id: string) => notesApi
  .endpoints
  .getNote
  .useQueryState(id);