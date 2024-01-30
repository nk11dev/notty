import React from 'react';

import FoldersToolbar from '@/features/folders-toolbar';
import FoldersFeature from '@/features/folders-feature';
import FoldersFooter from '@/features/folders-footer';
import SidebarWidget from '@/shared/ui/sidebar/sidebar-widget';

export const SidebarFoldersWidget = () => (
  <SidebarWidget isScrollable>
    <FoldersToolbar />
    <FoldersFeature />
    <FoldersFooter />
  </SidebarWidget>
);