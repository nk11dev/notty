import styles from './PageInfo.module.scss';

import React, { cloneElement } from 'react';
import type { ReactElement } from 'react';
import cn from 'classnames';

type Props = {
  icon: ReactElement,
  text: string,
  prefix?: string,
};

const PageInfo = ({ icon, text, prefix }: Props) => {
  if (!icon || !text) return null;

  const iconEl = icon as ReactElement;

  return (
    <div className={cn(styles.element, 'me-3')}>
      {cloneElement(iconEl, {
        className: cn('me-1', iconEl.props.className, styles.icon)
      })}

      {prefix && <span className="me-1">
        {prefix}:
      </span>}

      <span>{text}</span>
    </div>
  );
};

export default PageInfo;
