import styles from './EditorMenu.module.scss';

import React, { useContext } from 'react';

import { LuBold, LuItalic, LuStrikethrough, LuCode, LuPilcrow, LuHeading1, LuHeading2, LuHeading3, LuList, LuListOrdered, LuQuote, LuUndo2, LuRedo2 } from 'react-icons/lu';
import { LiaBroomSolid } from 'react-icons/lia';
import { GoCodeSquare } from 'react-icons/go';
import { PiEraser } from 'react-icons/pi';

import EditorContext from '@/shared/contexts/editor-context';
import Scrollbar from '@/shared/ui/controls/scrollbar';
import EditorButton from '@/shared/ui/page/page-editor/editor-button';

const EditorMenu = () => {
  const editor = useContext(EditorContext);

  if (!editor) {
    return null
  }

  return (
    <div className={styles.menu}>
      <Scrollbar options={{ visibility: 'hidden' }}>

        <EditorButton
          tooltip="Undo changes"
          icon={<LuUndo2 size={20} />}
          onClick={() => editor.commands.undo()}
          isDisabled={!editor.can().undo()}
        />

        <EditorButton
          tooltip="Redo changes"
          icon={<LuRedo2 size={20} />}
          onClick={() => editor.commands.redo()}
          isDisabled={!editor.can().redo()}
        />

        <span className={styles.separator} />

        <EditorButton
          tooltip="Bold"
          icon={<LuBold size={18} />}
          onClick={() => editor.commands.toggleBold()}
          isDisabled={!editor.can().toggleBold()}
          isActive={editor.isActive('bold')}
        />

        <EditorButton
          tooltip="Italic"
          icon={<LuItalic size={18} />}
          onClick={() => editor.commands.toggleItalic()}
          isDisabled={!editor.can().toggleItalic()}
          isActive={editor.isActive('italic')}
        />

        <EditorButton
          tooltip="Strikethrough"
          icon={<LuStrikethrough size={18} />}
          onClick={() => editor.commands.toggleStrike()}
          isDisabled={!editor.can().toggleStrike()}
          isActive={editor.isActive('strike')}
        />

        <EditorButton
          tooltip="Code"
          icon={<LuCode size={20} />}
          onClick={() => editor.commands.toggleCode()}
          isDisabled={!editor.can().toggleCode()}
          isActive={editor.isActive('code')}
        />

        <EditorButton
          tooltip="Clear style formatting"
          icon={<PiEraser size={20} />}
          onClick={() => editor.commands.unsetAllMarks()}
          isDisabled={!editor.can().unsetAllMarks()}
        />

        <span className={styles.separator} />

        <EditorButton
          tooltip="Paragraph"
          icon={<LuPilcrow size={18} />}
          onClick={() => editor.commands.setParagraph()}
          isDisabled={!editor.can().setParagraph()}
          isActive={editor.isActive('paragraph')}
        />

        <EditorButton
          tooltip="Heading 1"
          icon={<LuHeading1 size={20} />}
          onClick={() => editor.commands.toggleHeading({ level: 1 })}
          isActive={editor.isActive('heading', { level: 1 })}
        />

        <EditorButton
          tooltip="Heading 2"
          icon={<LuHeading2 size={20} />}
          onClick={() => editor.commands.toggleHeading({ level: 2 })}
          isActive={editor.isActive('heading', { level: 2 })}
        />

        <EditorButton
          tooltip="Heading 3"
          icon={<LuHeading3 size={20} />}
          onClick={() => editor.commands.toggleHeading({ level: 3 })}
          isActive={editor.isActive('heading', { level: 3 })}
        />

        <EditorButton
          tooltip="Bullet list"
          icon={<LuList size={20} />}
          onClick={() => editor.commands.toggleBulletList()}
          isActive={editor.isActive('bulletList')}
        />

        <EditorButton
          tooltip="Number list"
          icon={<LuListOrdered size={20} />}
          onClick={() => editor.commands.toggleOrderedList()}
          isActive={editor.isActive('orderedList')}
        />

        <EditorButton
          tooltip="Blockquote"
          icon={<LuQuote size={18} />}
          onClick={() => editor.commands.toggleBlockquote()}
          isDisabled={!editor.can().toggleBlockquote()}
          isActive={editor.isFocused && editor.isActive('blockquote')}
        />

        <EditorButton
          tooltip="Code block"
          icon={<GoCodeSquare size={22} />}
          onClick={() => editor.commands.toggleCodeBlock()}
          isActive={editor.isActive('codeBlock')}
        />

        <EditorButton
          tooltip="Reset nodes formatting to paragraph"
          icon={<LiaBroomSolid size={22} />}
          onClick={() => editor.commands.clearNodes()}
          isDisabled={!editor.can().clearNodes()}
        />

      </Scrollbar>
    </div>
  )
}
export default EditorMenu;