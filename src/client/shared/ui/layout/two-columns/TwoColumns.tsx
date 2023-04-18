import styles from './TwoColumns.module.scss';

import React from 'react';
import { useSearchParams } from 'react-router-dom';
import cn from 'classnames';

import { SIDEBAR_NAV_QUERY_PARAM } from '@/app/constants/query-params.constants';
import SidebarControls from '@/shared/ui/layout/sidebar-controls';

type Props = {
  sidebarContent: React.ReactNode,
  mainContent: React.ReactNode
};

const TwoColumns = (props: Props) => {
  const [currentQueryParams] = useSearchParams();

  const hasSidebarNav = currentQueryParams.get(SIDEBAR_NAV_QUERY_PARAM) !== '0';

  return (
    <div className={cn(styles.columns, {
      'has-sidebar-nav': hasSidebarNav
    })}>

      <SidebarControls />

      {hasSidebarNav && (
        <>
          <aside className={cn(styles.sidebar, 'sidebar-1')}>
            {props.sidebarContent}
          </aside>

          {/* <aside
            className={cn(styles.sidebar, 'sidebar-2')}
          /> */}
        </>
      )}

      <main className={cn(styles.main, 'p-2', {
        [styles.isHiddenBpSmall]: hasSidebarNav
      })}>
        {props.mainContent}
      </main>

    </div>
  );
}

export default TwoColumns;