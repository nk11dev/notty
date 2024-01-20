import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import type { NoteRouteSlugs } from '@/app/routing/types';
import { notesApi } from '@/entities/note/api-slices';
import { useNoteData } from '@/entities/note/hooks/useNoteData';
import { usePrevious } from '@/shared/hooks';
import type { NullableEditor } from '@/shared/types';
import { setEditorState } from '@/shared/utils/editor.utils';

export const useResetNoteEditor = (editor: NullableEditor): void => {
  const { noteSlug } = useParams() as NoteRouteSlugs;

  const { currentData } = notesApi.endpoints.getNote.useQueryState(noteSlug);

  const [noteData] = useNoteData();
  const prevNoteData = usePrevious(noteData);

  useEffect(() => {
    if (editor && currentData) {
      if (prevNoteData?.id !== currentData.id) {
        setEditorState(editor, currentData.body);
      }
    }
  }, [editor, currentData, prevNoteData])
}