import styles from './SidebarColumn.module.scss';

import React from 'react';
import type { CSSProperties } from 'react';
import cn from 'classnames';

type Props = {
  children: React.ReactNode,
  isHidden?: boolean,
  style?: CSSProperties,
};

const SidebarColumn = (props: Props) => (
  <div
    className={cn(styles.element, {
      [styles['is-hidden'] as string]: (props.isHidden === true)
    })}
    style={props.style}
  >
    {props.children}
  </div>
);

export default SidebarColumn;