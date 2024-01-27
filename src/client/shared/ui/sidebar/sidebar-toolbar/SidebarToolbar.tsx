import styles from './SidebarToolbar.module.scss';

import React from 'react';
import LoadingSpinner from '@/shared/ui/fetching/loading-spinner';

type Props = {
  title: string,
  showLoader?: boolean,
  refetchButton?: React.ReactNode
  children?: React.ReactNode
};

const SidebarToolbar = (props: Props) => {
  const { title, refetchButton, children, showLoader = false } = props;

  return (
    <div className={styles.outer}>
      <div className={styles.inner}>
        <b className='me-1'>
          {title}
        </b>
        {children}
      </div>
      {showLoader
        ? <LoadingSpinner />
        : refetchButton
      }
    </div>
  );
}

export default SidebarToolbar;