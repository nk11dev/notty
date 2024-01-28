import React, { useContext } from 'react';
import type { ReactElement } from 'react';

import { EditorContext } from '@/shared/contexts/editor-context';
import IconButton from '@/shared/ui/controls/icon-button';

type Props = {
  tooltip: string,
  icon: ReactElement,
  onClick: () => void,
  isDisabled?: boolean,
  isActive?: boolean,
};

const EditorButton = ({ onClick, isDisabled, isActive, ...restProps }: Props) => {
  const { editor, isEditorMenuDisabled } = useContext(EditorContext);

  if (!editor) {
    return null;
  }

  return (
    <IconButton
      buttonType="editor"
      onClick={(e) => {
        e.preventDefault();
        editor.view.focus();
        onClick();
      }}
      isDisabled={
        !editor.can().focus() ||
        isEditorMenuDisabled ||
        isDisabled
      }
      isActive={isActive && !isEditorMenuDisabled}
      {...restProps}
    />
  );
};

export default EditorButton;