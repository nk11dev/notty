import { useState, useEffect } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import { useParams } from 'react-router-dom';

import { notesApi } from '@/entities/note/api-slices';
import type { NoteUpdateEndpointArg } from '@/entities/note/types';

const defaultData: NoteUpdateEndpointArg = {
  id: null,
  title: '',
  body: '',
  is_bookmark: false,
};

type Result = [
  NoteUpdateEndpointArg,
  Dispatch<SetStateAction<NoteUpdateEndpointArg>>
];

export const useNoteData = (): Result => {
  const { noteSlug } = useParams();

  const { currentData } = notesApi.endpoints.getNote.useQueryState(noteSlug);

  const [noteData, setNoteData] = useState(defaultData);

  useEffect(() => {
    setNoteData(prevData => {
      if (currentData && (
        (prevData === defaultData) ||
        (prevData.id !== currentData.id)
      )) {
        return {
          id: currentData.id,
          title: currentData.title,
          body: currentData.body,
          is_bookmark: currentData.is_bookmark,
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