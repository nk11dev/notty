import './ProseMirror.scss';
import styles from './PageEditor.module.scss';

import React from 'react';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import ListItem from '@tiptap/extension-list-item';
import TextStyle from '@tiptap/extension-text-style';
import type { TextStyleOptions } from '@tiptap/extension-text-style';

import EditorMenuBar from '@/shared/ui/page/page-editor/editor-menu-bar';
import { demoContent } from '@/shared/ui/page/page-editor/demo-content';

interface ExtendedTextStyleOptions extends TextStyleOptions {
  types: string[];
}

const PageEditor = () => {
  const editor = useEditor({
    extensions: [
      TextStyle.configure({ types: [ListItem.name] } as ExtendedTextStyleOptions),
      StarterKit.configure({
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
    content: demoContent,
  })

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