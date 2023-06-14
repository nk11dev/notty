import React from 'react';

import SectionsToolbar from '@/features/sections-toolbar';
import SectionsFeature from '@/features/sections-feature';
import SidebarWidget from '@/shared/ui/sidebar/sidebar-widget';

export const SidebarSectionsWidget = () => (
  <SidebarWidget isScrollable>
    <SectionsToolbar />
    <SectionsFeature />
  </SidebarWidget>
);