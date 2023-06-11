import React from 'react';
import { faRotate, faPlus } from '@fortawesome/free-solid-svg-icons';

import { useLazyGetAllSectionsQuery } from '@/entities/section/api-slices';
import {
  useSectionsState,
  useHandleCreateSection
} from '@/entities/section/hooks';
import SidebarToolbar from '@/shared/ui/layout/sidebar-toolbar';
import ToolbarButton from '@/shared/ui/controls/toolbar-button';

const SectionsToolbar = () => {
  const { isFetching } = useSectionsState();
  const [refetchAllSections] = useLazyGetAllSectionsQuery();
  const [onCreateSection] = useHandleCreateSection();

  return (
    <SidebarToolbar
      title="Sections"
      showLoader={isFetching}
    >
      <ToolbarButton
        icon={faPlus}
        clickHandler={onCreateSection}
        tooltip="Create new section"
      />

      <ToolbarButton
        icon={faRotate}
        clickHandler={refetchAllSections}
        tooltip="Refetch sections"
      />
    </SidebarToolbar>
  );
}

export default SectionsToolbar;