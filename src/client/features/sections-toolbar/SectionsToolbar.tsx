import React from 'react';
import { faRotate, faPlus } from '@fortawesome/free-solid-svg-icons';

import {
  useLazyGetAllSectionsQuery,
  useCreateSectionMutation
} from '@/entities/section/api-slices';

import SidebarToolbar from '@/shared/ui/layout/sidebar-toolbar';
import ButtonIcon from '@/shared/ui/controls/button-icon';

const SectionsToolbar = () => {
  const [refetchAllSections] = useLazyGetAllSectionsQuery();
  const [createSection] = useCreateSectionMutation();

  return (
    <SidebarToolbar>
      <b>Sections</b>

      <ButtonIcon
        cls="m-1"
        icon={faPlus}
        clickHandler={() => createSection()}
      />

      <ButtonIcon
        cls="m-1"
        icon={faRotate}
        clickHandler={() => refetchAllSections()}
      />
    </SidebarToolbar>
  );
}

export default SectionsToolbar;