import styles from './SidebarControls.module.scss';

import React from 'react';

import FoldersControl from '@/shared/ui/sidebar/sidebar-controls/folders-control';
import BookmarksControl from '@/shared/ui/sidebar/sidebar-controls/bookmarks-control';
import SearchControl from '@/shared/ui/sidebar/sidebar-controls/search-control';
import RecentControl from '@/shared/ui/sidebar/sidebar-controls/recent-control';
import HomeControl from '@/shared/ui/sidebar/sidebar-controls/home-control';
import UserControl from '@/shared/ui/sidebar/sidebar-controls/user-control';

const SidebarControls = () => (
  <aside className={styles.element}>
    <FoldersControl />
    <BookmarksControl />
    <SearchControl />
    <RecentControl />

    <span className={styles.controlsFiller} />

    <HomeControl />
    <UserControl />
  </aside>
);

export default SidebarControls;