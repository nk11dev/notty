import React from 'react';
import { useParams } from 'react-router-dom';
import { IoSync } from 'react-icons/io5';

import type { NoteOptionalRouteSlugs } from '@/app/routing/types';
import { useLazyGetNotesByFolderQuery } from '@/entities/note/api-slices';
import { useNotesState } from '@/entities/note/hooks';
import SidebarToolbar from '@/shared/ui/sidebar/sidebar-toolbar';
import IconButton from '@/shared/ui/controls/icon-button';

const NotesToolbar = () => {
  const { folderSlug } = useParams() as NoteOptionalRouteSlugs;

  const { isFetching } = useNotesState(folderSlug);
  const [onRefetch] = useLazyGetNotesByFolderQuery();

  return (
    <SidebarToolbar
      title="Notes"
      showLoader={isFetching}
      refetchButton={!!folderSlug && (
        <IconButton
          buttonType="toolbar"
          tooltip="Refetch notes"
          icon={<IoSync />}
          onClick={() => onRefetch(folderSlug)}
        />
      )}
    />
  );
}

export default NotesToolbar;