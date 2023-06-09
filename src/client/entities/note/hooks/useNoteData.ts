import { useState, useEffect } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import { useParams } from 'react-router-dom';

import { notesApi } from '@/entities/note/api-slices';
import type { NoteUpdateEndpointArg } from '@/entities/note/types';

const defaultData: NoteUpdateEndpointArg = {
  id: null,
  title: '',
  body: '',
  is_favorite: false,
};

type Result = [
  NoteUpdateEndpointArg,
  Dispatch<SetStateAction<NoteUpdateEndpointArg>>
];

export const useNoteData = (): Result => {
  const { noteId } = useParams();

  const { currentData } = notesApi.endpoints.getNote.useQueryState(noteId);

  const [noteData, setNoteData] = useState(defaultData);

  useEffect(() => {
    setNoteData(prevData => {
      if (currentData && (
        (prevData === defaultData) ||
        (prevData.id !== currentData.note_id)
      )) {
        return {
          id: currentData.note_id,
          title: currentData.title,
          body: currentData.body,
          is_favorite: currentData.is_favorite,
        };
      }
      return prevData;
    });

  }, [currentData])

  return [
    noteData,
    setNoteData
  ];
}