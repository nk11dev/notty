import styles from './EditorButton.module.scss';

import React, { useContext } from 'react';
import type { ReactElement } from 'react';
import cn from 'classnames';

import EditorContext from '@/shared/contexts/editor-context';

type EditorButtonProps = {
  tooltip: string,
  icon: ReactElement,
  onClick: () => void,
  isDisabled?: boolean,
  isActive?: boolean,
};

const EditorButton = ({ tooltip, icon, onClick, isDisabled, isActive }: EditorButtonProps) => {
  const editor = useContext(EditorContext);

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