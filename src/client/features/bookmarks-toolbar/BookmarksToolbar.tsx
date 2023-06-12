import React from 'react';
import { faRotate } from '@fortawesome/free-solid-svg-icons';

import { useLazyGetBookmarksQuery } from '@/entities/note/api-slices';
import { useBookmarksState } from '@/entities/note/hooks';
import SidebarToolbar from '@/shared/ui/layout/sidebar-toolbar';
import ToolbarButton from '@/shared/ui/controls/toolbar-button';

const BookmarksToolbar = () => {
  const { isFetching } = useBookmarksState();
  const [refetchBookmarks] = useLazyGetBookmarksQuery();

  return (
    <SidebarToolbar
      title="Bookmarks"
      showLoader={isFetching}
    >
      <ToolbarButton
        icon={faRotate}
        clickHandler={() => refetchBookmarks()}
        tooltip="Refetch bookmarks"
      />
    </SidebarToolbar>
  );
}

export default BookmarksToolbar;