import styles from './SidebarControls.module.scss';

import React from 'react';

import SectionsControl from '@/shared/ui/layout/sidebar-controls/sections-control';
import SearchControl from '@/shared/ui/layout/sidebar-controls/search-control';
import RecentControl from '@/shared/ui/layout/sidebar-controls/recent-control';

const SidebarControls = () => (
  <aside className={styles.element}>
    <SectionsControl />
    <SearchControl />
    <RecentControl />
  </aside>
);

export default SidebarControls;