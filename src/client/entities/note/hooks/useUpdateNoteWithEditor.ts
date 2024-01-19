import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import type { Editor } from '@tiptap/core';

import type { NoteRouteSlugs } from '@/app/routing/types';
import {
  notesApi,
  useUpdateNoteMutation
} from '@/entities/note/api-slices';
import { useNoteData } from '@/entities/note/hooks/useNoteData';
import { useDebounce } from '@/shared/hooks';
import { updateEditor } from '@/shared/utils/editor.utils';

export const useUpdateNoteWithEditor = (editor: Editor | null): void => {
  const { noteSlug } = useParams() as NoteRouteSlugs;

  const [updateNote] = useUpdateNoteMutation();
  const { currentData } = notesApi.endpoints.getNote.useQueryState(noteSlug);

  const [noteData] = useNoteData();
  const debouncedContent = useDebounce(editor?.state.doc.content, 300);

  useEffect(() => {
    if (currentData && editor) {
      const { id, body } = currentData;
      const text = editor.getText();
      const html = editor.getHTML();

      if ((noteData.id === id) &&
        [text, html].every(val => val !== body)
      ) {
        updateEditor(editor, body);
      }
    }

  }, [currentData, editor, noteData])

  useEffect(() => {
    const { id, body } = currentData || {};
    const text = editor?.getText();
    const html = editor?.getHTML();

    if ((noteData.id === id) && (
      (text && [text, html].every(val => val !== body)) ||
      ((text === '') && body)
    )) {
      updateNote({
        id,
        body: text ? html : '',
      });
    }
  }, [debouncedContent, noteData, currentData, updateNote, editor])
}