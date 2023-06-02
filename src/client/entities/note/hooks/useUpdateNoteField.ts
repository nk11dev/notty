import { useState, useEffect } from 'react';
import type { ChangeEvent } from 'react';

import {
  notesApi,
  useUpdateNoteMutation
} from '@/entities/note/api-slices';
import type { NoteUpdateEndpointArg } from '@/entities/note/types';
import { useDebounce } from '@/shared/hooks';

const defaultContent: NoteUpdateEndpointArg = {
  id: null,
  title: '',
  body: '',
};

type FieldChangeEvent = ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>;

type Result = [
  NoteUpdateEndpointArg,
  (event: FieldChangeEvent) => void
];

export const useUpdateNoteField = (
  noteId: string,
  fieldName: string,
): Result => {

  const [updateNote] = useUpdateNoteMutation();

  const { currentData } = notesApi.endpoints.getNote.useQueryState(noteId);

  const [noteContent, setContent] = useState(defaultContent);
  const debouncedContent = useDebounce<NoteUpdateEndpointArg>(noteContent, 300);

  useEffect(() => {
    setContent((val) => {
      if (!currentData || (val !== defaultContent)) {
        return val;
      }

      return {
        id: currentData.note_id,
        title: currentData.title,
        body: currentData.body,
      };
    });

  }, [currentData, fieldName])

  useEffect(() => {
    if (
      currentData &&
      (debouncedContent.id === currentData.note_id) &&
      (debouncedContent[fieldName] !== currentData[fieldName])
    ) {
      updateNote(debouncedContent);
    }
  }, [debouncedContent, currentData, updateNote, fieldName])

  const onFieldChange = (event: FieldChangeEvent) => {
    setContent(prevValue => ({
      ...prevValue,
      [fieldName]: event.target.value
    }));
  }

  return [
    noteContent,
    onFieldChange
  ];
}