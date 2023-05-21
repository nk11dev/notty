import styles from '@/shared/ui/layout/sidebar-toolbar/SidebarToolbar.module.scss';

import React from 'react';
import { useParams } from 'react-router-dom';
import { faPlus, faRotate } from '@fortawesome/free-solid-svg-icons';
import cn from 'classnames';

import SidebarToolbar from '@/shared/ui/layout/sidebar-toolbar';
import ButtonIcon from '@/shared/ui/controls/button-icon';

import { useLazyGetNotesBySectionQuery } from '@/entities/note/api-slices';
import {
  useNotesState,
  useHandleCreateNote
} from '@/entities/note/hooks';

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
          <ButtonIcon
            icon={faPlus}
            clickHandler={() => onCreateNote(sectionId)}
            cls={cn(styles.toolbarBtn, 'm-1')}
            size={16}
            tooltip="Create section"
          />

          <ButtonIcon
            icon={faRotate}
            clickHandler={() => refetchNotesBySection(sectionId)}
            cls={cn(styles.toolbarBtn, 'm-1')}
            size={16}
            tooltip="Refetch Notes"
          />
        </>
      )}
    </SidebarToolbar>
  );
}

export default NotesToolbar;