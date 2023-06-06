import { useParams } from 'react-router-dom';

import { notesApi } from '@/entities/note/api-slices';

export const useNoteState = (noteId?: string) => {
  const urlParams = useParams();

  return notesApi
    .endpoints
    .getNote
    .useQueryState(noteId || urlParams.noteId)?.data;
};