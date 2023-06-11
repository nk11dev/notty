import React from 'react';
import {
  AiOutlineFolder,
  AiOutlineFolderOpen,
} from 'react-icons/ai';

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
      {
        isSectionsModeOrNull
          ? <AiOutlineFolderOpen />
          : <AiOutlineFolder />
      }
    </ControlsButton>
  );
};

export default SectionsControl;