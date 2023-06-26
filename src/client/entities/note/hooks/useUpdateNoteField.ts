import { useEffect } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import { useParams } from 'react-router-dom';

import {
  notesApi,
  useUpdateNoteMutation
} from '@/entities/note/api-slices';
import { useNoteData } from '@/entities/note/hooks/useNoteData';
import type { NoteUpdateEndpointArg } from '@/entities/note/types';
import { useDebounce } from '@/shared/hooks';

type Result = [
  NoteUpdateEndpointArg,
  Dispatch<SetStateAction<NoteUpdateEndpointArg>>
];

export const useUpdateNoteField = (fieldName: string): Result => {
  const { noteSlug } = useParams();

  const [updateNote] = useUpdateNoteMutation();
  const { currentData } = notesApi.endpoints.getNote.useQueryState(noteSlug);

  const [noteData, setNoteData] = useNoteData();
  const debouncedData = useDebounce<NoteUpdateEndpointArg>(noteData, 300);

  useEffect(() => {
    if (
      currentData &&
      (debouncedData.id === currentData.id) &&
      (debouncedData[fieldName] !== currentData[fieldName])
    ) {
      updateNote(debouncedData);
    }
  }, [debouncedData, currentData, updateNote, fieldName])

  return [
    noteData,
    setNoteData
  ];
}