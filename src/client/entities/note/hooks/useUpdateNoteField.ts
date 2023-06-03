import { useEffect } from 'react';
import type { ChangeEvent } from 'react';
import { useParams } from 'react-router-dom';

import {
  notesApi,
  useUpdateNoteMutation
} from '@/entities/note/api-slices';
import { useNoteData } from '@/entities/note/hooks/useNoteData';
import type { NoteUpdateEndpointArg } from '@/entities/note/types';
import { useDebounce } from '@/shared/hooks';

type FieldChangeEvent = ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>;

type Result = [
  NoteUpdateEndpointArg,
  (event: FieldChangeEvent) => void
];

export const useUpdateNoteField = (fieldName: string): Result => {
  const { noteId } = useParams();

  const [updateNote] = useUpdateNoteMutation();
  const { currentData } = notesApi.endpoints.getNote.useQueryState(noteId);

  const [noteData, setNoteData] = useNoteData();
  const debouncedData = useDebounce<NoteUpdateEndpointArg>(noteData, 300);

  useEffect(() => {
    if (
      currentData &&
      (debouncedData.id === currentData.note_id) &&
      (debouncedData[fieldName] !== currentData[fieldName])
    ) {
      updateNote(debouncedData);
    }
  }, [debouncedData, currentData, updateNote, fieldName])

  const onFieldChange = (event: FieldChangeEvent) => {
    setNoteData(prevValue => ({
      ...prevValue,
      [fieldName]: event.target.value
    }));
  }

  return [
    noteData,
    onFieldChange
  ];
}