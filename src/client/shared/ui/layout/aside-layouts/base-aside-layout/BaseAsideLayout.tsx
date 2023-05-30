import styles from './BaseAsideLayout.module.scss';

import React from 'react';
import { useSearchParams } from 'react-router-dom';
import cn from 'classnames';

import { SIDEBAR_NAV_QUERY_PARAM } from '@/app/constants/query-params.constants';
import SidebarControls from '@/shared/ui/layout/sidebar-controls';

type Props = {
  asideContent: React.ReactNode,
  children: React.ReactNode,
};

const BaseAsideLayout = (props: Props) => {
  const [searchParams] = useSearchParams();

  const hasSidebarNav = searchParams.get(SIDEBAR_NAV_QUERY_PARAM) !== '0';

  return (
    <div className={styles.columns}>
      <SidebarControls />

      {hasSidebarNav && props.asideContent}

      <main className={cn(styles.main, 'px-4 py-3', {
        [styles.isHiddenBpSmall]: hasSidebarNav
      })}>
        {props.children}
      </main>
    </div>
  );
};

export default BaseAsideLayout;