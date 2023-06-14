import React from 'react';

import NotesToolbar from '@/features/notes-toolbar';
import NotesFeature from '@/features/notes-feature';
import SidebarWidget from '@/shared/ui/layout/sidebar-widget';

export const SidebarNotesWidget = () => (
  <SidebarWidget isScrollable>
    <NotesToolbar />
    <NotesFeature />
  </SidebarWidget>
);