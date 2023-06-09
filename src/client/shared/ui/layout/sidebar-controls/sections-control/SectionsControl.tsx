import React from 'react';
import {
  AiOutlineFolder,
  AiOutlineFolderOpen
} from 'react-icons/ai';

import { SidebarModesMap } from '@/app/enums/query-params.enums';
import { useSidebarMode } from '@/shared/hooks';
import ControlsButton from '@/shared/ui/controls/controls-button';

const SectionsControl = () => {
  const { sidebarMode, isSidebarVisible, setSidebarMode } = useSidebarMode();

  const toggleSidebarMode = () => {
    const newMode = ([SidebarModesMap.SECTIONS, null].includes(sidebarMode as SidebarModesMap))
      ? SidebarModesMap.HIDDEN
      : SidebarModesMap.SECTIONS;

    setSidebarMode(newMode);
  };

  return (
    <ControlsButton
      clickHandler={toggleSidebarMode}
      clsIsActive={isSidebarVisible}
      tooltip={`${isSidebarVisible ? 'Hide' : 'Show'} sections`}
    >
      {
        isSidebarVisible
          ? <AiOutlineFolderOpen />
          : <AiOutlineFolder />
      }
    </ControlsButton>
  );
};

export default SectionsControl;