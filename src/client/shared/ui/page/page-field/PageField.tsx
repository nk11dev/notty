import styles from './PageField.module.scss';

import React from 'react';
import cn from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';

type Props = {
  data: string | number,
  text?: string,
  icon?: IconDefinition,
};

const PageField = (props: Props) => {
  const { data, text, icon } = props;

  if (!data) return null;

  return (
    <div className={cn(styles.field, 'me-3')}>
      {icon && <FontAwesomeIcon
        icon={icon}
        className="me-1"
        style={{
          width: 16,
          height: 16
        }}
      />}

      {text && <span className="me-1">
        {text}:
      </span>}

      <span>{data}</span>
    </div>
  );
};

export default PageField;
