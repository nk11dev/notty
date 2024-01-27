import React from 'react';
import { IoBookmarksOutline } from 'react-icons/io5';

import { SidebarModesMap } from '@/app/enums/query-params.enums';
import { useSidebarMode } from '@/shared/hooks';
import IconButton from '@/shared/ui/controls/icon-button';

const BookmarksControl = () => {
  const { sidebarMode, isSidebarVisible, setSidebarMode } = useSidebarMode();

  const isBookmarksMode = (sidebarMode === SidebarModesMap.BOOKMARKS);

  const onClick = () => {
    const newMode = (sidebarMode === SidebarModesMap.BOOKMARKS)
      ? SidebarModesMap.HIDDEN
      : SidebarModesMap.BOOKMARKS;

    setSidebarMode(newMode);
  };

  return (
    <IconButton
      buttonType="control"
      tooltip={`${isSidebarVisible ? 'Hide' : 'Show'} bookmarks`}
      icon={<IoBookmarksOutline />}
      onClick={onClick}
      isActive={isBookmarksMode}
    />
  );
}

export default BookmarksControl;