import './prosemirror-styles/pm-common.scss';
import './prosemirror-styles/pm-code-block.scss';
import './prosemirror-styles/atom-one-dark.theme.scss';

import styles from './EditorPage.module.scss';

import React, { useEffect } from 'react';
import type { ReactNode } from 'react';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import ListItem from '@tiptap/extension-list-item';
import TextStyle from '@tiptap/extension-text-style';
import type { TextStyleOptions } from '@tiptap/extension-text-style';
import { CodeBlockLowlight } from '@tiptap/extension-code-block-lowlight';
import { common, createLowlight } from 'lowlight';

import { EDITOR_DEFAULT_CONTENT } from '@/app/constants/editor.constants';
import { useResetNoteEditor, useUpdateNoteBody } from '@/entities/note/hooks';
import { EditorContextProvider } from '@/shared/contexts/editor-context';
import { useSidebarMode, useDeviceMatch } from '@/shared/hooks';

interface ExtendedTextStyleOptions extends TextStyleOptions {
  types: string[];
}

type Props = {
  render: (editorContent: ReactNode) => ReactNode
};

const EditorPage = ({ render }: Props) => {
  const { isMobile } = useDeviceMatch();
  const { isSidebarVisible } = useSidebarMode();

  const editor = useEditor({
    extensions: [
      Underline.configure(),
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
        codeBlock: false
      }),
      Link.configure({}),
      CodeBlockLowlight.configure({
        lowlight: createLowlight(common),
        HTMLAttributes: {
          class: 'hljs',
        },
      })
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
    <EditorContextProvider editor={editor}>
      {render(
        <EditorContent
          className={styles.editor}
          editor={editor}
          spellCheck="false"
        />
      )}
    </EditorContextProvider>
  );
};

export default EditorPage;