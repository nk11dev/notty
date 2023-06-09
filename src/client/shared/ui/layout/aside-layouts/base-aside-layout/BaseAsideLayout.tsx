import styles from './BaseAsideLayout.module.scss';

import React from 'react';
import cn from 'classnames';

import { useSidebarMode } from '@/shared/hooks';
import SidebarControls from '@/shared/ui/layout/sidebar-controls';

type Props = {
  asideContent: React.ReactNode,
  children: React.ReactNode,
  cls: string,
};

const BaseAsideLayout = (props: Props) => {
  const { isSidebarVisible } = useSidebarMode();

  return (
    <div className={cn(styles.layout, props.cls, {
      [styles['sidebar-is-visible']]: isSidebarVisible,
      [styles['sidebar-is-hidden']]: !isSidebarVisible,
    })}>
      <SidebarControls />

      <aside className={styles.sidebar}>
        {props.asideContent}
      </aside>

      <main className={styles.main}>
        {props.children}
      </main>
    </div>
  );
};

export default BaseAsideLayout;