import styles from './Scrollbar.module.scss';

import React from 'react';
import type { ReactNode } from 'react';
import cn from 'classnames';
import type { ScrollbarsVisibilityBehavior } from 'overlayscrollbars';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';

type Props = {
  children: ReactNode,
  cls?: string,
  options?: {
    visibility?: ScrollbarsVisibilityBehavior
  }
};

const Scroll = ({ children, cls, options }: Props) => (
  <OverlayScrollbarsComponent
    className={cn(styles.element, cls)}
    options={{
      scrollbars: {
        visibility: options?.visibility || 'auto'
      }
    }}
  >
    {children}
  </OverlayScrollbarsComponent>
);

export default Scroll;