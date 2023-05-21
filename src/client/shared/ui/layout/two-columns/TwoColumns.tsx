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
  const [searchParams] = useSearchParams();

  const hasSidebarNav = searchParams.get(SIDEBAR_NAV_QUERY_PARAM) !== '0';

  return (
    <div className={styles.columns}>
      <SidebarControls />

      {hasSidebarNav && props.sidebarContent}

      <main className={cn(styles.main, 'px-4 py-3', {
        [styles.isHiddenBpSmall]: hasSidebarNav
      })}>
        {props.mainContent}
      </main>
    </div>
  );
}

export default TwoColumns;