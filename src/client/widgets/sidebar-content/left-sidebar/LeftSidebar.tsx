import React from 'react';
import { faRotate } from '@fortawesome/free-solid-svg-icons';

import {
  useLazyGetSectionsQuery
} from '@/entities/section/api-slices';

import SectionsList from '@/features/sections-list';
import PinnedList from '@/features/pinned-list';
import ButtonIcon from '@/shared/ui/controls/button-icon';

const LeftSidebar = () => {
  const [refetchSections] = useLazyGetSectionsQuery();

  const handleRefetch = () => {
    console.log('handleRefetch()');
    refetchSections();
  }

  return (
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
          clickHandler={handleRefetch}
        />

        <SectionsList />
      </div>
    </>
  );
}

export default LeftSidebar;