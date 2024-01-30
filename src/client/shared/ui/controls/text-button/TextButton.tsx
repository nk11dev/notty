import styles from './TextButton.module.scss';

import React from 'react';
import type { ReactElement } from 'react';
import cn from 'classnames';

type Props = {
  text: string,
  icon: ReactElement,
  onClick: () => void,
};

const TextButton = ({ text, icon, onClick }: Props) => {
  return (
    <button
      type="button"
      className={cn(styles.btn)}
      onClick={onClick}
    >
      <span className="me-1">{icon}</span>
      <span className={styles.text}>{text}</span>
    </button>
  );
}

export default TextButton;