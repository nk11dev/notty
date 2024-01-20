import React from 'react';
import cn from 'classnames';

import type { EditorButtonProps, EditorProps } from '@/shared/types';

const EditorButton = ({ editor, renderIcon, onClick, isDisabled, isActive }: EditorButtonProps & EditorProps) => {

  if (!editor) {
    return null;
  }

  return (
    <button
      onClick={onClick}
      disabled={!editor.can().focus() || isDisabled}
      className={cn({ 'is-active': isActive })}
    >
      {renderIcon()}
    </button>
  );
};

export default EditorButton;