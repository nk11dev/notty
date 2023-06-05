import React from 'react';

import NotesToolbar from '@/features/notes-toolbar';
import NotesList from '@/features/notes-list';
import SidebarWidget from '@/shared/ui/layout/sidebar-widget';

export const SidebarNotesWidget = () => (
  <SidebarWidget isScrollable>
    <NotesToolbar />
    <NotesList />
  </SidebarWidget>
);