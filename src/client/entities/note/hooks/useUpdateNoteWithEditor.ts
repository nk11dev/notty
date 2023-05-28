import { useEffect } from 'react';
import type { Editor } from '@tiptap/core';

import {
  notesApi,
  useUpdateNoteMutation
} from '@/entities/note/api-slices';
import { useDebounce } from '@/shared/hooks';

export const useUpdateNoteWithEditor = (
  noteId: string,
  editor: Editor
): void => {
  const [updateNote] = useUpdateNoteMutation();
  const { currentData } = notesApi.endpoints.getNote.useQueryState(noteId);

  const debouncedContent = useDebounce(editor?.state.doc.content, 300);

  useEffect(() => {
    if (currentData && editor) {
      if (['', null].includes(currentData.body)) {
        editor
          .chain()
          .setContent(currentData.body)
          .setTextSelection(1)
          .focus()
          .run();
      } else {
        editor.commands.setContent(currentData.body);
      }
    }
  }, [currentData, editor])

  useEffect(() => {
    const text = editor?.getText();
    const html = editor?.getHTML();

    if (
      (text && ![text, html].includes(currentData.body)) ||
      ((text === '') && !['', null].includes(currentData.body))
    ) {
      updateNote({
        id: currentData.note_id,
        title: currentData.title,
        body: text ? html : '',
      });
    }
  }, [debouncedContent, currentData, updateNote, editor])
}