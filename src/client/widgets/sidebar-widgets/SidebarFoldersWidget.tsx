import React from 'react';

import FoldersToolbar from '@/features/folders-toolbar';
import FoldersFeature from '@/features/folders-feature';
import SidebarWidget from '@/shared/ui/sidebar/sidebar-widget';

export const SidebarFoldersWidget = () => (
  <SidebarWidget isScrollable>
    <FoldersToolbar />
    <FoldersFeature />
  </SidebarWidget>
);