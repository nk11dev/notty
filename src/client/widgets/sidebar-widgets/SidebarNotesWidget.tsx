import React from 'react';

import NotesToolbar from '@/features/notes-toolbar';
import NotesFeature from '@/features/notes-feature';
import NotesFooter from '@/features/notes-footer';
import SidebarWidget from '@/shared/ui/sidebar/sidebar-widget';

export const SidebarNotesWidget = () => (
  <SidebarWidget isScrollable>
    <NotesToolbar />
    <NotesFeature />
    <NotesFooter />
  </SidebarWidget>
);