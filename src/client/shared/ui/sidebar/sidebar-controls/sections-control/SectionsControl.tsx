import React from 'react';
import { IoFolderOutline} from 'react-icons/io5';

import { SidebarModesMap } from '@/app/enums/query-params.enums';
import { useSidebarMode } from '@/shared/hooks';
import ControlsButton from '@/shared/ui/controls/controls-button';

const SectionsControl = () => {
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
      tooltip={`${isSidebarVisible ? 'Hide' : 'Show'} sections`}
    >
      <IoFolderOutline/>
    </ControlsButton>
  );
};

export default SectionsControl;