import React from 'react';
import { AiOutlineStar } from 'react-icons/ai';

import { SidebarModesMap } from '@/app/enums/query-params.enums';
import { useSidebarMode } from '@/shared/hooks';
import ControlsButton from '@/shared/ui/controls/controls-button';

const BookmarksControl = () => {
  const { sidebarMode, isSidebarVisible, setSidebarMode } = useSidebarMode();

  const isFavoritesMode = (sidebarMode === SidebarModesMap.FAVORITES);

  const toggleSidebarMode = () => {
    const newMode = (sidebarMode === SidebarModesMap.FAVORITES)
      ? SidebarModesMap.HIDDEN
      : SidebarModesMap.FAVORITES;

    setSidebarMode(newMode);
  };

  return (
    <ControlsButton
      clickHandler={toggleSidebarMode}
      clsIsActive={isFavoritesMode}
      tooltip={`${isSidebarVisible ? 'Hide' : 'Show'} favorite notes`}
    >
      <AiOutlineStar />
    </ControlsButton>
  );
}

export default BookmarksControl;