import './ProseMirror.scss';
import styles from './PageEditor.module.scss';

import React, { useEffect } from 'react';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import ListItem from '@tiptap/extension-list-item';
import TextStyle from '@tiptap/extension-text-style';
import Placeholder from '@tiptap/extension-placeholder'
import type { TextStyleOptions } from '@tiptap/extension-text-style';

import { EDITOR_DEFAULT_CONTENT } from '@/app/constants/editor.constants';
import { useResetNoteEditor, useUpdateNoteBody } from '@/entities/note/hooks';
import EditorContext from '@/shared/contexts/editor-context';
import { useSidebarMode, useDeviceMatch } from '@/shared/hooks';
import EditorMenu from '@/shared/ui/page/page-editor/editor-menu';

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
      Placeholder.configure({
        placeholder: 'Write something …',
      }),
    ],
    content: EDITOR_DEFAULT_CONTENT,
  });

  // Reset note in editor if user switched to different note
  useResetNoteEditor(editor);

  // Make API request to update note's body if user edited note's content
  useUpdateNoteBody(editor);

  // Remove focus from editor if user's device is mobile (to hide blue cursor under caret on touch devices)
  useEffect(() => {
    if (isMobile && isSidebarVisible && editor) {
      editor.commands.blur();
    }
  }, [isMobile, isSidebarVisible, editor]);

  return (
    <EditorContext.Provider value={editor}>
      <EditorMenu />
      <EditorContent
        className={styles.editor}
        editor={editor}
        spellCheck="false"
      />
    </EditorContext.Provider>
  );
};

export default PageEditor;