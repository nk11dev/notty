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

export const useUpdateNoteWithEditor = (editor: Editor): void => {
  const { noteId } = useParams();

  const [updateNote] = useUpdateNoteMutation();
  const { currentData } = notesApi.endpoints.getNote.useQueryState(noteId);

  const [noteData] = useNoteData();
  const debouncedContent = useDebounce(editor?.state.doc.content, 300);

  useEffect(() => {
    if (currentData && editor) {
      const text = editor.getText();

      if (
        (text === EDITOR_DEFAULT_CONTENT) ||
        (noteData.id !== currentData.note_id)
      ) {
        editor.commands.setContent(currentData.body, false, PM_PARSE_OPTIONS);
      } 
    }

  }, [currentData, editor, noteData])

  useEffect(() => {
    const text = editor?.getText();
    const html = editor?.getHTML();

    if (
      (noteData.id === currentData.note_id) &&
      (
        (text && ![text, html].includes(currentData.body)) ||
        ((text === '') && !['', null].includes(currentData.body))
      )
    ) {
      updateNote({
        id: currentData.note_id,
        body: text ? html : '',
      });
    }
  }, [debouncedContent, noteData, currentData, updateNote, editor])
}