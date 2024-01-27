import React from 'react';
import { IoFolderOutline } from 'react-icons/io5';

import { SidebarModesMap } from '@/app/enums/query-params.enums';
import { useSidebarMode } from '@/shared/hooks';
import IconButton from '@/shared/ui/controls/icon-button';

const FoldersControl = () => {
  const { isFoldersModeOrNull, isSidebarVisible, setSidebarMode } = useSidebarMode();

  const onClick = () => {
    const newMode = isFoldersModeOrNull
      ? SidebarModesMap.HIDDEN
      : SidebarModesMap.FOLDERS;

    setSidebarMode(newMode);
  };

  return (
    <IconButton
      buttonType="control"
      tooltip={`${isSidebarVisible ? 'Hide' : 'Show'} folders`}
      icon={<IoFolderOutline />}
      onClick={onClick}
      isActive={isFoldersModeOrNull}
    />
  );
};

export default FoldersControl;