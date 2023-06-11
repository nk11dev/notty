import React from 'react';
import { useParams } from 'react-router-dom';
import { faPlus, faRotate } from '@fortawesome/free-solid-svg-icons';

import { useLazyGetNotesBySectionQuery } from '@/entities/note/api-slices';
import {
  useNotesState,
  useHandleCreateNote
} from '@/entities/note/hooks';
import SidebarToolbar from '@/shared/ui/layout/sidebar-toolbar';
import ToolbarButton from '@/shared/ui/controls/toolbar-button';

const NotesToolbar = () => {
  const { sectionId } = useParams();

  const { isFetching } = useNotesState(sectionId);
  const [refetchNotesBySection] = useLazyGetNotesBySectionQuery();
  const [onCreateNote] = useHandleCreateNote();

  return (
    <SidebarToolbar
      title="Notes"
      showLoader={isFetching}
    >
      {sectionId && (
        <>
          <ToolbarButton
            icon={faPlus}
            clickHandler={() => onCreateNote(sectionId)}
            tooltip="Create new note"
          />

          <ToolbarButton
            icon={faRotate}
            clickHandler={() => refetchNotesBySection(sectionId)}
            tooltip="Refetch notes"
          />
        </>
      )}
    </SidebarToolbar>
  );
}

export default NotesToolbar;