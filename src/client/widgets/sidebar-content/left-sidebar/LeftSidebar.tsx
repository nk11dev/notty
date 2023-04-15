import styles from './LeftSidebar.module.scss';

import React from 'react';

import PinnedToolbar from '@/features/pinned-toolbar';
import PinnedList from '@/features/pinned-list';
import SectionsToolbar from '@/features/sections-toolbar';
import SectionsList from '@/features/sections-list';

const LeftSidebar = () => (
  <>
    <div className={styles.sidebarItem}>
      <PinnedToolbar />
      <PinnedList />
    </div>

    <div className={styles.sidebarItem}>
      <SectionsToolbar />
      <SectionsList />
    </div>
  </>
);

export default LeftSidebar;