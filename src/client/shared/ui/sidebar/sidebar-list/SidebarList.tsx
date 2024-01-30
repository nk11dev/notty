import styles from './SidebarList.module.scss';

import React from 'react';

import Scrollbar from '@/shared/ui/controls/scrollbar';

type Props = {
  children: React.ReactNode
};

const SidebarList = (props: Props) => (
  <Scrollbar cls="flex-grow-1">
    <ul className={styles.list}>
      {props.children}
    </ul>
  </Scrollbar>
);

export default SidebarList;