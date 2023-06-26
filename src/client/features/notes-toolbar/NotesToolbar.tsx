import React from 'react';
import { useParams } from 'react-router-dom';
import { faPlus, faRotate } from '@fortawesome/free-solid-svg-icons';

import { useLazyGetNotesBySectionQuery } from '@/entities/note/api-slices';
import {
  useNotesState,
  useHandleCreateNote
} from '@/entities/note/hooks';
import SidebarToolbar from '@/shared/ui/sidebar/sidebar-toolbar';
import ToolbarButton from '@/shared/ui/controls/toolbar-button';

const NotesToolbar = () => {
  const { folderSlug } = useParams();

  const { isFetching } = useNotesState(folderSlug);
  const [refetchNotesBySection] = useLazyGetNotesBySectionQuery();
  const [onCreateNote] = useHandleCreateNote();

  return (
    <SidebarToolbar
      title="Notes"
      showLoader={isFetching}
    >
      {folderSlug && (
        <>
          <ToolbarButton
            icon={faPlus}
            clickHandler={() => onCreateNote(folderSlug)}
            tooltip="Create new note"
          />

          <ToolbarButton
            icon={faRotate}
            clickHandler={() => refetchNotesBySection(folderSlug)}
            tooltip="Refetch notes"
          />
        </>
      )}
    </SidebarToolbar>
  );
}

export default NotesToolbar;