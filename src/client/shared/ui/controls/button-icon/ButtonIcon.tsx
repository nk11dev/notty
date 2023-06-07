import styles from './ButtonIcon.module.scss';

import React from 'react';
import cn from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';

type Props = {
  icon?: IconDefinition,
  children?: React.ReactNode,
  clickHandler?: () => void;
  cls?: string,
  size?: number,
  tooltip?: string,
};

const ButtonIcon = (props: Props) => {
  const { icon, children, clickHandler, cls, size, tooltip } = props;

  if (!icon && !children) return null;

  return (
    <span
      className={cn(styles.btn, cls)}
      onClick={clickHandler}
      title={tooltip}
    >
      {icon
        ? <FontAwesomeIcon
          icon={icon}
          style={{
            width: size,
            height: size
          }}
        />
        : children}
    </span>
  );
};

export default ButtonIcon;