import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import type { NoteRouteSlugs } from '@/app/routing/types';
import {
  notesApi,
  useUpdateNoteMutation
} from '@/entities/note/api-slices';
import { useDebounce } from '@/shared/hooks';
import type { NullableEditor } from '@/shared/types';

export const useUpdateNoteBody = (editor: NullableEditor): void => {
  const { noteSlug } = useParams() as NoteRouteSlugs;

  const [updateNote] = useUpdateNoteMutation();
  const { currentData } = notesApi.endpoints.getNote.useQueryState(noteSlug);

  const debouncedContent = useDebounce(editor?.state.doc.content, 300);

  useEffect(() => {
    if (editor && currentData) {
      const { id, body } = currentData;
      const text = editor.getText();
      const html = editor.getHTML();

      if (
        (text && [text, html].every(val => val !== body)) ||
        (text === '' && body)
      ) {
        updateNote({ id, body: text ? html : '' });
      }
    }
  }, [editor, currentData, debouncedContent, updateNote])
}