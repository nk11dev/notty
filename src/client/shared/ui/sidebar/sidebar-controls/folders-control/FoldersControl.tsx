import React from 'react';
import { IoFolderOutline} from 'react-icons/io5';

import { SidebarModesMap } from '@/app/enums/query-params.enums';
import { useSidebarMode } from '@/shared/hooks';
import ControlsButton from '@/shared/ui/controls/controls-button';

const FoldersControl = () => {
  const { isFoldersModeOrNull, isSidebarVisible, setSidebarMode } = useSidebarMode();

  const toggleSidebarMode = () => {
    const newMode = isFoldersModeOrNull
      ? SidebarModesMap.HIDDEN
      : SidebarModesMap.FOLDERS;

    setSidebarMode(newMode);
  };

  return (
    <ControlsButton
      clickHandler={toggleSidebarMode}
      clsIsActive={isFoldersModeOrNull}
      tooltip={`${isSidebarVisible ? 'Hide' : 'Show'} folders`}
    >
      <IoFolderOutline/>
    </ControlsButton>
  );
};

export default FoldersControl;