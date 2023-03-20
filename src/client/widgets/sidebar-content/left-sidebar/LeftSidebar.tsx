import React from 'react';

import SectionsToolbar from '@/features/sections-toolbar';
import SectionsList from '@/features/sections-list';
import PinnedList from '@/features/pinned-list';

const LeftSidebar = () => (
  <>
    <div>
      <b>Pinned</b>
      <PinnedList />
    </div>

    <div>
      <SectionsToolbar/>
      <SectionsList />
    </div>
  </>
);

export default LeftSidebar;