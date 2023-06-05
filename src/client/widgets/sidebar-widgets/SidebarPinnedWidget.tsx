import React from 'react';

import PinnedToolbar from '@/features/pinned-toolbar';
import PinnedList from '@/features/pinned-list';
import SidebarWidget from '@/shared/ui/layout/sidebar-widget';

export const SidebarPinnedWidget = () => (
  <SidebarWidget>
    <PinnedToolbar />
    <PinnedList />
  </SidebarWidget>
);