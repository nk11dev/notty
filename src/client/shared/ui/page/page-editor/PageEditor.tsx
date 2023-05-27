import './ProseMirror.scss';
import styles from './PageEditor.module.scss';

import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import ListItem from '@tiptap/extension-list-item';
import TextStyle from '@tiptap/extension-text-style';
import type { TextStyleOptions } from '@tiptap/extension-text-style';

import {
  notesApi,
  useUpdateNoteMutation
} from '@/entities/note/api-slices';
import { useDebounce } from '@/shared/hooks';
import EditorMenuBar from '@/shared/ui/page/page-editor/editor-menu-bar';

interface ExtendedTextStyleOptions extends TextStyleOptions {
  types: string[];
}

const PageEditor = () => {
  const { noteId } = useParams();

  const editor = useEditor({
    extensions: [
      TextStyle.configure({ types: [ListItem.name] } as ExtendedTextStyleOptions),
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
        bulletList: {
          keepMarks: true,
          keepAttributes: false,
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false,
        },
      }),
    ],
    content: '',
  });

  const [updateNote] = useUpdateNoteMutation();
  const { currentData } = notesApi.endpoints.getNote.useQueryState(noteId);
  
  const debouncedContent = useDebounce(editor?.state.doc.content, 300);

  useEffect(() => {
    if (currentData && editor) {
      editor.commands.setContent(currentData.body);
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

  return (
    <>
      <EditorMenuBar editor={editor} />
      <EditorContent
        className={styles.editor}
        editor={editor}
      />
    </>
  );
};

export default PageEditor;