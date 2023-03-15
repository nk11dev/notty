import React from 'react';

import { faRotate } from '@fortawesome/free-solid-svg-icons';

import SectionsList from '@/features/sections-list';
import PinnedList from '@/features/pinned-list';
import ButtonIcon from '@/shared/ui/controls/button-icon';

function refreshSections() {
  console.log('refreshSections()');
}

const LeftSidebar = () => (
  <>
    <div>
      <b>Pinned</b>
      <PinnedList />
    </div>

    <div>
      <b>Sections</b>

      <ButtonIcon
        cls="m-1"
        icon={faRotate}
        clickHandler={refreshSections}
      />

      <SectionsList />
    </div>
  </>
);

export default LeftSidebar;