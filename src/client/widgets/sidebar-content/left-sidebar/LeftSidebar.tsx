import React from 'react';

import PinnedToolbar from '@/features/pinned-toolbar';
import PinnedList from '@/features/pinned-list';
import SectionsToolbar from '@/features/sections-toolbar';
import SectionsList from '@/features/sections-list';

const LeftSidebar = () => (
  <>
    <PinnedToolbar />
    <PinnedList />

    <SectionsToolbar />
    <SectionsList />
  </>
);

export default LeftSidebar;