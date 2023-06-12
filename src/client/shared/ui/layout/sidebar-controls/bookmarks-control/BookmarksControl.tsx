import React from 'react';
import { AiOutlineStar } from 'react-icons/ai';

import { SidebarModesMap } from '@/app/enums/query-params.enums';
import { useSidebarMode } from '@/shared/hooks';
import ControlsButton from '@/shared/ui/controls/controls-button';

const BookmarksControl = () => {
  const { sidebarMode, isSidebarVisible, setSidebarMode } = useSidebarMode();

  const isBookmarksMode = (sidebarMode === SidebarModesMap.BOOKMARKS);

  const toggleSidebarMode = () => {
    const newMode = (sidebarMode === SidebarModesMap.BOOKMARKS)
      ? SidebarModesMap.HIDDEN
      : SidebarModesMap.BOOKMARKS;

    setSidebarMode(newMode);
  };

  return (
    <ControlsButton
      clickHandler={toggleSidebarMode}
      clsIsActive={isBookmarksMode}
      tooltip={`${isSidebarVisible ? 'Hide' : 'Show'} bookmarks`}
    >
      <AiOutlineStar />
    </ControlsButton>
  );
}

export default BookmarksControl;