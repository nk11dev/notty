import React from 'react';
import { IoSync } from 'react-icons/io5';

import { useLazyGetAllFoldersQuery } from '@/entities/folder/api-slices';
import { useFoldersState } from '@/entities/folder/hooks';
import SidebarToolbar from '@/shared/ui/sidebar/sidebar-toolbar';
import IconButton from '@/shared/ui/controls/icon-button';

const FoldersToolbar = () => {
  const { isFetching } = useFoldersState();
  const [onRefetch] = useLazyGetAllFoldersQuery();

  return (
    <SidebarToolbar
      title="Folders"
      showLoader={isFetching}
      refetchButton={
        <IconButton
          buttonType="toolbar"
          tooltip="Refetch folders"
          icon={<IoSync />}
          onClick={() => onRefetch()}
        />
      }
    />
  );
}

export default FoldersToolbar;