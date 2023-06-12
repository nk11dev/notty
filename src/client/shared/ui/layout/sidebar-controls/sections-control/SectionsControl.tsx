import React from 'react';
import { IoFolderOutline} from 'react-icons/io5';

import { SidebarModesMap } from '@/app/enums/query-params.enums';
import { useSidebarMode } from '@/shared/hooks';
import ControlsButton from '@/shared/ui/controls/controls-button';

const SectionsControl = () => {
  const { isSectionsModeOrNull, isSidebarVisible, setSidebarMode } = useSidebarMode();

  const toggleSidebarMode = () => {
    const newMode = isSectionsModeOrNull
      ? SidebarModesMap.HIDDEN
      : SidebarModesMap.SECTIONS;

    setSidebarMode(newMode);
  };

  return (
    <ControlsButton
      clickHandler={toggleSidebarMode}
      clsIsActive={isSectionsModeOrNull}
      tooltip={`${isSidebarVisible ? 'Hide' : 'Show'} sections`}
    >
      <IoFolderOutline/>
    </ControlsButton>
  );
};

export default SectionsControl;