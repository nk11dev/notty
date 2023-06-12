import React from 'react';

import BookmarksToolbar from '@/features/bookmarks-toolbar';
import BookmarksFeature from '@/features/bookmarks-feature';
import SidebarWidget from '@/shared/ui/layout/sidebar-widget';

export const SidebarBookmarksWidget = () => (
  <SidebarWidget isScrollable>
    <BookmarksToolbar />
    <BookmarksFeature />
  </SidebarWidget>
);