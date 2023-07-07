import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import type { Editor } from '@tiptap/core';

import { EDITOR_DEFAULT_CONTENT } from '@/app/constants/editor.constants';
import {
  notesApi,
  useUpdateNoteMutation
} from '@/entities/note/api-slices';
import { useNoteData } from '@/entities/note/hooks/useNoteData';
import { useDebounce } from '@/shared/hooks';

const PM_PARSE_OPTIONS = {
  preserveWhitespace: true
};

export const useUpdateNoteWithEditor = (editor: Editor | null): void => {
  const { noteSlug } = useParams();

  const [updateNote] = useUpdateNoteMutation();
  const { currentData } = notesApi.endpoints.getNote.useQueryState(noteSlug);

  const [noteData] = useNoteData();
  const debouncedContent = useDebounce(editor?.state.doc.content, 300);

  useEffect(() => {
    if (currentData && editor) {
      const text = editor.getText();

      if (
        (text === EDITOR_DEFAULT_CONTENT) ||
        (noteData.id !== currentData.id)
      ) {
        editor.commands.setContent(currentData.body, false, PM_PARSE_OPTIONS);
      }
    }

  }, [currentData, editor, noteData])

  useEffect(() => {
    const text = editor?.getText();
    const html = editor?.getHTML();

    if (
      (noteData.id === currentData.id) &&
      (
        (text && ![text, html].includes(currentData.body)) ||
        ((text === '') && !['', null].includes(currentData.body))
      )
    ) {
      updateNote({
        id: currentData.id,
        body: text ? html : '',
      });
    }
  }, [debouncedContent, noteData, currentData, updateNote, editor])
}