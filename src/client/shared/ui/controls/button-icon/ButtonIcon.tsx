import './ButtonIcon.scss';

import React from 'react';
import cn from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';

type Props = {
  icon: IconDefinition,
  cls?: string,
  clickHandler?: () => void;
};

const ButtonIcon = (props: Props) => {
  const { icon, cls, clickHandler } = props;

  if (!icon) return null;

  return (
    <span
      className={cn('button-icon', cls)}
      onClick={clickHandler}
    >
      <FontAwesomeIcon
        icon={icon}
        style={{ width: 16, height: 16 }}
      />
    </span>
  );
};

export default ButtonIcon;