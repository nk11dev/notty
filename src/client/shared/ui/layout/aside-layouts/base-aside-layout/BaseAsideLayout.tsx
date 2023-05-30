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
    <>
      <SidebarControls />

      {hasSidebarNav && (
        <aside className={styles.sidebar}>
          {props.asideContent}
        </aside>
      )}

      <main className={cn(styles.main, 'px-4 py-3', {
        [styles.hideOnMobile]: hasSidebarNav
      })}>
        {props.children}
      </main>
    </>
  );
};

export default BaseAsideLayout;