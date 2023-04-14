import styles from './SidebarList.module.scss';

import React from 'react';

type Props = {
  children: React.ReactNode
};

const SidebarList = (props: Props) => (
  <ul className={styles.list}>
    {props.children}
  </ul>
);

export default SidebarList;