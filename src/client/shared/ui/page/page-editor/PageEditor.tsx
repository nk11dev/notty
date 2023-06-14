import './ProseMirror.scss';
import styles from './PageEditor.module.scss';

import React, { useEffect } from 'react';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import ListItem from '@tiptap/extension-list-item';
import TextStyle from '@tiptap/extension-text-style';
import type { TextStyleOptions } from '@tiptap/extension-text-style';

import { useUpdateNoteWithEditor } from '@/entities/note/hooks';
import { useSidebarMode, useDeviceMatch } from '@/shared/hooks';
import EditorMenuBar from '@/shared/ui/page/page-editor/editor-menu-bar';

interface ExtendedTextStyleOptions extends TextStyleOptions {
  types: string[];
}

const PageEditor = () => {
  const { isMobile } = useDeviceMatch();
  const { isSidebarVisible } = useSidebarMode();

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

  useUpdateNoteWithEditor(editor);

  // remove focus from editor if user's device is mobile (to hide blue cursor under caret on touch devices)
  useEffect(() => {
    if (isMobile && isSidebarVisible && editor) {
      editor.commands.blur();
    }
  }, [isMobile, isSidebarVisible, editor]);

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