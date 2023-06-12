import React from 'react';

import FavoritesToolbar from '@/features/favorites-toolbar';
import FavoritesFeature from '@/features/favorites-feature';
import SidebarWidget from '@/shared/ui/layout/sidebar-widget';

export const SidebarFavoritesWidget = () => (
  <SidebarWidget isScrollable>
    <FavoritesToolbar />
    <FavoritesFeature />
  </SidebarWidget>
);