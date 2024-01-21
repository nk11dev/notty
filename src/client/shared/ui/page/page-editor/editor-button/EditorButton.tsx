import styles from './EditorButton.module.scss';

import React from 'react';
import cn from 'classnames';

import type { EditorButtonProps, EditorProps } from '@/shared/types';

const EditorButton = ({ editor, tooltip, icon, onClick, isDisabled, isActive }: EditorButtonProps & EditorProps) => {

  if (!editor) {
    return null;
  }

  return (
    <button
      onClick={onClick}
      disabled={!editor.can().focus() || isDisabled}
      className={cn(styles.btn, {
        [styles.isActive as string]: isActive
      })}
    >
      <span title={tooltip}>
        {icon}
      </span>
    </button>
  );
};

export default EditorButton;