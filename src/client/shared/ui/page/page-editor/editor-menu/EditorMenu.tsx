import styles from './EditorMenu.module.scss';

import React from 'react';

import { faBold, faItalic, faStrikethrough, faCode, faParagraph, faListUl, faListOl, faRotateLeft, faRotateRight, faQuoteLeft, faTextSlash, faBroom } from '@fortawesome/free-solid-svg-icons';
import { BiCodeBlock } from 'react-icons/bi';

import Icon from '@/shared/ui/controls/icon';
import type { EditorButtonProps, EditorProps } from '@/shared/types';
import EditorButton from '@/shared/ui/page/page-editor/editor-button';

const EditorMenu = ({ editor }: EditorProps) => {

  if (!editor) {
    return null
  }

  const renderButton = (btnProps: EditorButtonProps, index: number) => (
    <EditorButton
      {...btnProps}
      key={index}
      editor={editor}
    />
  );

  return (
    <div className={styles.menu}>
      {[
        // Bold
        {
          renderIcon: () => <Icon icon={faBold} />,
          onClick: () => editor.chain().focus().toggleBold().run(),
          isDisabled: !editor.can().toggleBold(),
          isActive: editor.isActive('bold')
        },

        // Italic
        {
          renderIcon: () => <Icon icon={faItalic} />,
          onClick: () => editor.chain().focus().toggleItalic().run(),
          isDisabled: !editor.can().toggleItalic(),
          isActive: editor.isActive('italic')
        },

        // Strike through
        {
          renderIcon: () => <Icon icon={faStrikethrough} />,
          onClick: () => editor.chain().focus().toggleStrike().run(),
          isDisabled: !editor.can().toggleStrike(),
          isActive: editor.isActive('strike')
        },

        // Code
        {
          renderIcon: () => <Icon icon={faCode} />,
          onClick: () => editor.chain().focus().toggleCode().run(),
          isDisabled: !editor.can().toggleCode(),
          isActive: editor.isActive('code')
        },

        // Unset all marks
        {
          renderIcon: () => <Icon icon={faTextSlash} />,
          onClick: () => editor.chain().focus().unsetAllMarks().run(),
          isDisabled: !editor.can().unsetAllMarks()
        },
      ].map(renderButton)}

      <span className={styles.separator} />

      {[
        // Paragraph
        {
          renderIcon: () => <Icon icon={faParagraph} />,
          onClick: () => editor.chain().focus().setParagraph().run(),
          isDisabled: !editor.can().setParagraph(),
          isActive: editor.isActive('paragraph')
        },

        // H1
        {
          renderIcon: () => 'H1',
          onClick: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
          isDisabled: !editor.can().toggleHeading({ level: 1 }),
          isActive: editor.isActive('heading', { level: 1 })
        },

        // H2
        {
          renderIcon: () => 'H2',
          onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
          isDisabled: !editor.can().toggleHeading({ level: 2 }),
          isActive: editor.isActive('heading', { level: 2 })
        },

        // H3
        {
          renderIcon: () => 'H3',
          onClick: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
          isDisabled: !editor.can().toggleHeading({ level: 3 }),
          isActive: editor.isActive('heading', { level: 3 })
        },

        // Bullet list
        {
          renderIcon: () => <Icon icon={faListUl} />,
          onClick: () => editor.chain().focus().toggleBulletList().run(),
          isDisabled: !editor.can().toggleBulletList(),
          isActive: editor.isActive('bulletList')
        },

        // Ordered list
        {
          renderIcon: () => <Icon icon={faListOl} />,
          onClick: () => editor.chain().focus().toggleOrderedList().run(),
          isDisabled: !editor.can().toggleOrderedList(),
          isActive: editor.isActive('orderedList')
        },

        // Code block
        {
          renderIcon: () => <BiCodeBlock />,
          onClick: () => editor.chain().focus().toggleCodeBlock().run(),
          isDisabled: !editor.can().toggleCodeBlock(),
          isActive: editor.isActive('codeBlock')
        },

        // Blockquote
        {
          renderIcon: () => <Icon icon={faQuoteLeft} />,
          onClick: () => editor.chain().focus().toggleBlockquote().run(),
          isDisabled: !editor.can().toggleBlockquote(),
          isActive: editor.isActive('blockquote')
        },

        // Clear nodes
        {
          renderIcon: () => <Icon icon={faBroom} />,
          onClick: () => editor.chain().focus().clearNodes().run(),
          isDisabled: !editor.can().clearNodes(),
        },
      ].map(renderButton)}

      <span className={styles.separator} />

      {[
        // Undo
        {
          renderIcon: () => <Icon icon={faRotateLeft} />,
          onClick: () => editor.chain().focus().undo().run(),
          isDisabled: !editor.can().undo(),
        },

        // Redo
        {
          renderIcon: () => <Icon icon={faRotateRight} />,
          onClick: () => editor.chain().focus().redo().run(),
          isDisabled: !editor.can().redo(),
        }
      ].map(renderButton)}
    </div>
  )
}
export default EditorMenu;