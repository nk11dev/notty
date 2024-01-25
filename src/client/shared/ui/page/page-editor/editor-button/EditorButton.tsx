import styles from './EditorButton.module.scss';

import React, { useContext } from 'react';
import type { ReactElement } from 'react';
import cn from 'classnames';

import { ContentContext } from '@/shared/contexts/content-context';
import EditorContext from '@/shared/contexts/editor-context';

type EditorButtonProps = {
  tooltip: string,
  icon: ReactElement,
  onClick: () => void,
  isDisabled?: boolean,
  isActive?: boolean,
};

const EditorButton = ({ tooltip, icon, onClick, isDisabled, isActive }: EditorButtonProps) => {
  const { isTitleFocused } = useContext(ContentContext);
  const editor = useContext(EditorContext);

  if (!editor) {
    return null;
  }

  return (
    <button
      onClick={onClick}
      disabled={
        !editor.can().focus() ||
        isTitleFocused ||
        isDisabled
      }
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