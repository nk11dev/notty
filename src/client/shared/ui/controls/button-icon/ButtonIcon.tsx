import styles from './ButtonIcon.module.scss';

import React from 'react';
import cn from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';

type Props = {
  icon: IconDefinition,
  cls?: string,
  size?: number,
  clickHandler?: () => void;
};

const ButtonIcon = (props: Props) => {
  const { icon, cls, size, clickHandler } = props;

  if (!icon) return null;

  return (
    <span
      className={cn(styles.btn, cls)}
      onClick={clickHandler}
    >
      <FontAwesomeIcon
        icon={icon}
        style={{
          width: size,
          height: size
        }}
      />
    </span>
  );
};

export default ButtonIcon;