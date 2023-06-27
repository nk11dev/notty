import React from 'react';
import { faRotate, faPlus } from '@fortawesome/free-solid-svg-icons';

import { useLazyGetAllFoldersQuery } from '@/entities/section/api-slices';
import {
  useFoldersState,
  useHandleCreateFolder
} from '@/entities/section/hooks';
import SidebarToolbar from '@/shared/ui/sidebar/sidebar-toolbar';
import ToolbarButton from '@/shared/ui/controls/toolbar-button';

const SectionsToolbar = () => {
  const { isFetching } = useFoldersState();
  const [onRefetch] = useLazyGetAllFoldersQuery();
  const [onCreate] = useHandleCreateFolder();

  return (
    <SidebarToolbar
      title="Sections"
      showLoader={isFetching}
    >
      <ToolbarButton
        icon={faPlus}
        clickHandler={onCreate}
        tooltip="Create new section"
      />

      <ToolbarButton
        icon={faRotate}
        clickHandler={() => onRefetch()}
        tooltip="Refetch sections"
      />
    </SidebarToolbar>
  );
}

export default SectionsToolbar;