import styles from './SidebarControls.module.scss';

import React from 'react';

import SectionsControl from '@/shared/ui/layout/sidebar-controls/sections-control';
import SearchControl from '@/shared/ui/layout/sidebar-controls/search-control';
import RecentControl from '@/shared/ui/layout/sidebar-controls/recent-control';
import UserControl from '@/shared/ui/layout/sidebar-controls/user-control';

const SidebarControls = () => (
  <aside className={styles.element}>
    <SectionsControl />
    <SearchControl />
    <RecentControl />

    <span className={styles.controlsFiller} />

    <UserControl />
  </aside>
);

export default SidebarControls;