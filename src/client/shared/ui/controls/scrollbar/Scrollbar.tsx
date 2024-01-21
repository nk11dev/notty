import styles from './Scrollbar.module.scss';

import React from 'react';
import type { ReactNode } from 'react';
import cn from 'classnames';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';

type Props = {
  children: ReactNode,
  cls?: string,
};

const Scroll = ({ children, cls }: Props) => (
  <OverlayScrollbarsComponent className={cn(styles.element, cls)}>
    {children}
  </OverlayScrollbarsComponent>
);

export default Scroll;