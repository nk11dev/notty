import React from 'react';
import { faRotate, faPlus } from '@fortawesome/free-solid-svg-icons';

import {
  useLazyGetAllSectionsQuery,
  useCreateSectionMutation
} from '@/entities/section/api-slices';

import SectionsList from '@/features/sections-list';
import PinnedList from '@/features/pinned-list';
import ButtonIcon from '@/shared/ui/controls/button-icon';

const LeftSidebar = () => {
  const [refetchAllSections] = useLazyGetAllSectionsQuery();
  const [createSection] = useCreateSectionMutation();

  const handleCreate = () => {
    console.log('handleCreate()');
    createSection();
  }

  const handleRefetch = () => {
    console.log('handleRefetch()');
    refetchAllSections();
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
          icon={faPlus}
          clickHandler={handleCreate}
        />

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