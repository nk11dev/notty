import React from 'react';

import FoldersToolbar from '@/features/folders-toolbar';
import FoldersFeature from '@/features/folders-feature';
import FoldersFooter from '@/features/folders-footer';
import SidebarWidget from '@/shared/ui/sidebar/sidebar-widget';
import SidebarBody from '@/shared/ui/sidebar/sidebar-body';

export const SidebarFoldersWidget = () => (
  <SidebarWidget isScrollable>
    <FoldersToolbar />
    <SidebarBody>
      <FoldersFeature />
    </SidebarBody>
    <FoldersFooter />
  </SidebarWidget>
);