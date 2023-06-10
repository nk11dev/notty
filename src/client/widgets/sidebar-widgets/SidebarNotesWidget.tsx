import React from 'react';

import NotesToolbar from '@/features/notes-toolbar';
import NotesStandardList from '@/features/notes-standard-list';
import SidebarWidget from '@/shared/ui/layout/sidebar-widget';

export const SidebarNotesWidget = () => (
  <SidebarWidget isScrollable>
    <NotesToolbar />
    <NotesStandardList />
  </SidebarWidget>
);