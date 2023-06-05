import React from 'react';

import SectionsToolbar from '@/features/sections-toolbar';
import SectionsList from '@/features/sections-list';
import SidebarWidget from '@/shared/ui/layout/sidebar-widget';


export const SidebarSectionsWidget = () => (
  <SidebarWidget isScrollable>
    <SectionsToolbar />
    <SectionsList />
  </SidebarWidget>
);