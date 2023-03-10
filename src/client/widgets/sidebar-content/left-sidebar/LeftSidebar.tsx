import React from 'react';

import SectionsList from '@/features/sections-list';
import PinnedList from '@/features/pinned-list';

const LeftSidebar = () => (
  <>
    <div>
      <b>Pinned</b>
      <PinnedList />
    </div>

    <div>
      <b>Sections</b>
      <SectionsList />
    </div>
  </>
);

export default LeftSidebar;