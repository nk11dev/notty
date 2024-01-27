import styles from './PageInfo.module.scss';

import React from 'react';
import cn from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';

type Props = {
  text: string,
  prefix?: string,
  icon?: IconDefinition,
};

const PageInfo = (props: Props) => {
  const { text, prefix, icon } = props;

  if (!text) return null;

  return (
    <div className={cn(styles.element, 'me-3')}>
      {icon && <FontAwesomeIcon
        icon={icon}
        className="me-1"
        style={{
          width: 16,
          height: 16
        }}
      />}

      {prefix && <span className="me-1">
        {prefix}:
      </span>}

      <span>{text}</span>
    </div>
  );
};

export default PageInfo;
