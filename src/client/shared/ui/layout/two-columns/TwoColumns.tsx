import styles from './TwoColumns.module.scss';

import React from 'react';
import cn from 'classnames';

import SidebarControls from '@/shared/ui/layout/sidebar-controls';

type Props = {
  sidebarContent: React.ReactNode,
  mainContent: React.ReactNode
};

const TwoColumns = (props: Props) => (
  <div className={styles.columns}>

    <SidebarControls />

    <aside className={cn(styles.sidebar, 'sidebar-1')}>
      {props.sidebarContent}
    </aside>

{/*     <aside
      className={cn(styles.sidebar, 'sidebar-2')}
    /> */}

    <main className={cn(styles.main, 'p-2')}>
      {props.mainContent}
    </main>

  </div>
);

export default TwoColumns;