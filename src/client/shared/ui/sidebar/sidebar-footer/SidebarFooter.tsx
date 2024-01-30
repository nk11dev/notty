import styles from './SidebarFooter.module.scss';

import React from 'react';

type Props = {
  children: React.ReactNode
};

const SidebarFooter = ({ children }: Props) => {
  return (
    <div className={styles.element}>
      {children}
    </div>
  );
}

export default SidebarFooter;