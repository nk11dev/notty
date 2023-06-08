import { notesApi } from '@/entities/note/api-slices';

export const useNoteState = (noteId: string) => notesApi
  .endpoints
  .getNote
  .useQueryState(noteId);