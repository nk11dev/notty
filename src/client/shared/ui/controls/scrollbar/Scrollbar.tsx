import styles from './Scrollbar.module.scss';

import React from 'react';
import type { ReactNode } from 'react';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';

type Props = {
  children: ReactNode,
};

const Scroll = (props: Props) => (
  <OverlayScrollbarsComponent className={styles.element}>
    {props.children}
  </OverlayScrollbarsComponent>
);

export default Scroll;