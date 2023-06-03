import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import type { Editor } from '@tiptap/core';

import { PAGE_TITLE_INPUT_EL_NAME } from '@/app/constants/elements.constants';
import {
  notesApi,
  useUpdateNoteMutation
} from '@/entities/note/api-slices';
import { useNoteData } from '@/entities/note/hooks/useNoteData';
import { useDebounce } from '@/shared/hooks';

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
        ((document.activeElement as HTMLInputElement)?.name !== PAGE_TITLE_INPUT_EL_NAME) &&
        ['', null].includes(currentData.body)
      ) {
        editor
          .chain()
          .setContent(currentData.body)
          .setTextSelection(1)
          .focus()
          .run();

      } else if (
        (text === '') ||
        (noteData.id !== currentData.note_id)
      ) {
        editor.commands.setContent(currentData.body);
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