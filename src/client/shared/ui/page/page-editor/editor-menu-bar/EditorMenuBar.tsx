import styles from './EditorMenuBar.module.scss';

import React from 'react';
import type { Editor } from '@tiptap/core';

import { faBold, faItalic, faStrikethrough, faCode, faParagraph, faListUl, faListOl, faRotateLeft, faRotateRight, faQuoteLeft, faTextSlash, faBroom } from '@fortawesome/free-solid-svg-icons';
import { BiCodeBlock } from 'react-icons/bi';

import Icon from '@/shared/ui/controls/icon';

type Props = {
  editor: Editor | null
};

const EditorMenuBar = ({ editor }: Props) => {

  if (!editor) {
    return null
  }

  return (
    <div className={styles.menu}>
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .toggleBold()
            .run()
        }
        className={editor.isActive('bold') ? 'is-active' : ''}
      >
        <Icon icon={faBold} />
      </button>

      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .toggleItalic()
            .run()
        }
        className={editor.isActive('italic') ? 'is-active' : ''}
      >
        <Icon icon={faItalic} />
      </button>

      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .toggleStrike()
            .run()
        }
        className={editor.isActive('strike') ? 'is-active' : ''}
      >
        <Icon icon={faStrikethrough} />
      </button>

      <button
        onClick={() => editor.chain().focus().toggleCode().run()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .toggleCode()
            .run()
        }
        className={editor.isActive('code') ? 'is-active' : ''}
      >
        <Icon icon={faCode} />
      </button>

      <button onClick={() => editor.chain().focus().unsetAllMarks().run()}>
        <Icon icon={faTextSlash} />
      </button>

      <span className={styles.separator} />

      <button
        onClick={() => editor.chain().focus().setParagraph().run()}
        className={editor.isActive('paragraph') ? 'is-active' : ''}
      >
        <Icon icon={faParagraph} />
      </button>

      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
      >
        H1
      </button>

      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
      >
        H2
      </button>

      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={editor.isActive('heading', { level: 3 }) ? 'is-active' : ''}
      >
        H3
      </button>

      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive('bulletList') ? 'is-active' : ''}
      >
        <Icon icon={faListUl} />
      </button>

      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={editor.isActive('orderedList') ? 'is-active' : ''}
      >
        <Icon icon={faListOl} />
      </button>

      <button
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={editor.isActive('codeBlock') ? 'is-active' : ''}
      >
        <BiCodeBlock />
      </button>

      <button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={editor.isActive('blockquote') ? 'is-active' : ''}
      >
        <Icon icon={faQuoteLeft} />
      </button>

      <button onClick={() => editor.chain().focus().clearNodes().run()}>
        <Icon icon={faBroom} />
      </button>

      <span className={styles.separator} />

      <button
        onClick={() => editor.chain().focus().undo().run()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .undo()
            .run()
        }
      >
        <Icon icon={faRotateLeft} />
      </button>

      <button
        onClick={() => editor.chain().focus().redo().run()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .redo()
            .run()
        }
      >
        <Icon icon={faRotateRight} />
      </button>
    </div>
  )
}
export default EditorMenuBar;