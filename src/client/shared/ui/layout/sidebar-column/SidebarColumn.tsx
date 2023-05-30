import styles from './SidebarColumn.module.scss';

import React from 'react';

type Props = {
  children: React.ReactNode,
};

const SidebarColumn = (props: Props) => (
  <div className={styles.sidebarColumn}>
    {props.children}
  </div>
);

export default SidebarColumn;