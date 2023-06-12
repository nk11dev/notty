import React from 'react';
import { faRotate } from '@fortawesome/free-solid-svg-icons';

import { useLazyGetFavoritesQuery } from '@/entities/note/api-slices';
import { useFavoritesState } from '@/entities/note/hooks';
import SidebarToolbar from '@/shared/ui/layout/sidebar-toolbar';
import ToolbarButton from '@/shared/ui/controls/toolbar-button';

const FavoritesToolbar = () => {
  const { isFetching } = useFavoritesState();
  const [refetchFavorites] = useLazyGetFavoritesQuery();

  return (
    <SidebarToolbar
      title="Favorites"
      showLoader={isFetching}
    >
      <ToolbarButton
        icon={faRotate}
        clickHandler={() => refetchFavorites()}
        tooltip="Refetch favorites"
      />
    </SidebarToolbar>
  );
}

export default FavoritesToolbar;