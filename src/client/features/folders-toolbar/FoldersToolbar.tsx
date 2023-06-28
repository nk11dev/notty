import React from 'react';
import { faRotate, faPlus } from '@fortawesome/free-solid-svg-icons';

import { useLazyGetAllFoldersQuery } from '@/entities/folder/api-slices';
import {
  useFoldersState,
  useHandleCreateFolder
} from '@/entities/folder/hooks';
import SidebarToolbar from '@/shared/ui/sidebar/sidebar-toolbar';
import ToolbarButton from '@/shared/ui/controls/toolbar-button';

const FoldersToolbar = () => {
  const { isFetching } = useFoldersState();
  const [onRefetch] = useLazyGetAllFoldersQuery();
  const [onCreate] = useHandleCreateFolder();

  return (
    <SidebarToolbar
      title="Folders"
      showLoader={isFetching}
    >
      <ToolbarButton
        icon={faPlus}
        clickHandler={onCreate}
        tooltip="Create new folder"
      />

      <ToolbarButton
        icon={faRotate}
        clickHandler={() => onRefetch()}
        tooltip="Refetch folders"
      />
    </SidebarToolbar>
  );
}

export default FoldersToolbar;