import styles from './SidebarToolbar.module.scss';

import React from 'react';
import cn from 'classnames';

import LoadingSpinner from '@/shared/ui/fetching/loading-spinner';

const { SHOW_DEBUG_UI } = process.env;

type Props = {
  title: string,
  showLoader?: boolean,
  refetchButton?: React.ReactNode
};

const SidebarToolbar = (props: Props) => {
  const { title, refetchButton, showLoader = false } = props;

  return (
    <div className={styles.outer}>
      <div className={styles.inner}>
        <b className={cn(styles.title, 'me-1')}>
          {title}
        </b>
      </div>
      {showLoader
        ? <LoadingSpinner />
        : Number(SHOW_DEBUG_UI)
          ? refetchButton
          : null
      }
    </div>
  );
}

export default SidebarToolbar;