import React from 'react';
import { useParams } from 'react-router-dom';
import { faPlus, faRotate } from '@fortawesome/free-solid-svg-icons';

import type { NoteOptionalRouteSlugs } from '@/app/routing/types';
import { useLazyGetNotesByFolderQuery } from '@/entities/note/api-slices';
import {
  useNotesState,
  useHandleCreateNote
} from '@/entities/note/hooks';
import SidebarToolbar from '@/shared/ui/sidebar/sidebar-toolbar';
import ToolbarButton from '@/shared/ui/controls/toolbar-button';

const NotesToolbar = () => {
  const { folderSlug } = useParams() as NoteOptionalRouteSlugs;

  const { isFetching } = useNotesState(folderSlug);
  const [onRefetch] = useLazyGetNotesByFolderQuery();
  const [onCreate] = useHandleCreateNote();

  return (
    <SidebarToolbar
      title="Notes"
      showLoader={isFetching}
    >
      {folderSlug && (
        <>
          <ToolbarButton
            icon={faPlus}
            clickHandler={() => onCreate(folderSlug)}
            tooltip="Create new note"
          />

          <ToolbarButton
            icon={faRotate}
            clickHandler={() => onRefetch(folderSlug)}
            tooltip="Refetch notes"
          />
        </>
      )}
    </SidebarToolbar>
  );
}

export default NotesToolbar;