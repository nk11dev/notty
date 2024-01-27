import React from 'react';
import { IoSync } from 'react-icons/io5';

import { useLazyGetBookmarksQuery } from '@/entities/note/api-slices';
import { useBookmarksState } from '@/entities/note/hooks';
import SidebarToolbar from '@/shared/ui/sidebar/sidebar-toolbar';
import IconButton from '@/shared/ui/controls/icon-button';

const BookmarksToolbar = () => {
  const { isFetching } = useBookmarksState();
  const [refetchBookmarks] = useLazyGetBookmarksQuery();

  return (
    <SidebarToolbar
      title="Bookmarks"
      showLoader={isFetching}
      refetchButton={
        <IconButton
          buttonType="toolbar"
          tooltip="Refetch bookmarks"
          icon={<IoSync />}
          onClick={() => refetchBookmarks()}
        />
      }
    />
  );
}

export default BookmarksToolbar;