import styles from './SidebarToolbar.module.scss';

import React from 'react';

type Props = {
  title: string,
  children?: React.ReactNode
};

const SidebarToolbar = (props: Props) => {
  const { title, children } = props;

  return (
    <div className={styles.toolbar}>
      <b className='me-1'>
        {title}
      </b>
      
      {children}
    </div>
  );
}

export default SidebarToolbar;