import styles from './SidebarToolbar.module.scss';

import React from 'react';

type Props = {
  children: React.ReactNode
};

const SidebarToolbar = (props: Props) => (
  <div className={styles.toolbar}>
    {props.children}
  </div>
);

export default SidebarToolbar;