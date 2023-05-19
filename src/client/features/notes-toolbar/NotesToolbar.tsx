import styles from '@/shared/ui/layout/sidebar-toolbar/SidebarToolbar.module.scss';

import React from 'react';
import { useParams } from 'react-router-dom';
import { faRotate, faPlus } from '@fortawesome/free-solid-svg-icons';
import cn from 'classnames';

import SidebarToolbar from '@/shared/ui/layout/sidebar-toolbar';
import ButtonIcon from '@/shared/ui/controls/button-icon';

import { useLazyGetNotesBySectionQuery } from '@/entities/note/api-slices';
import { useHandleCreateNote } from '@/entities/note/hooks';

const NotesToolbar = () => {
  const { sectionId } = useParams();

  const [refetchNotesBySection] = useLazyGetNotesBySectionQuery();
  const [onCreateNote] = useHandleCreateNote();

  return (
    <SidebarToolbar title="Notes">
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