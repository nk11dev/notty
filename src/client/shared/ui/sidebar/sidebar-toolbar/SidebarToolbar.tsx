import styles from './SidebarToolbar.module.scss';

import React from 'react';

import LoadingSpinner from '@/shared/ui/fetching/loading-spinner';

type Props = {
  title: string,
  children?: React.ReactNode
  showLoader?: boolean
};

const SidebarToolbar = (props: Props) => {
  const { title, children, showLoader = false } = props;

  return (
    <div className={styles.element}>
      <span>
        <b className='me-1'>
          {title}
        </b>
        {children}
      </span>
      {showLoader && <LoadingSpinner/>}
    </div>
  );
}

export default SidebarToolbar;