import styles from './SidebarBody.module.scss';

import React from 'react';

type Props = {
  children: React.ReactNode
};

const SidebarBody = ({ children }: Props) => (
  <div className={styles.element}>
    {children}
  </div>
);

export default SidebarBody;