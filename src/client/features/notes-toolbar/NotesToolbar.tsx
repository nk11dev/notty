import styles from '@/shared/ui/layout/sidebar-toolbar/SidebarToolbar.module.scss';

import React from 'react';
import { useParams } from 'react-router-dom';
import { faRotate, faPlus } from '@fortawesome/free-solid-svg-icons';
import cn from 'classnames';

import { useNavigateWithQP } from '@/shared/hooks';
import SidebarToolbar from '@/shared/ui/layout/sidebar-toolbar';
import ButtonIcon from '@/shared/ui/controls/button-icon';

import {
  useLazyGetNotesBySectionQuery,
  useCreateNoteMutation
} from '@/entities/note/api-slices';

const NotesToolbar = () => {
  const { sectionId } = useParams();

  const { navigateWithQP } = useNavigateWithQP();

  const [refetchNotesBySection] = useLazyGetNotesBySectionQuery();
  const [createNote] = useCreateNoteMutation();

  const onCreateNote = async () => {
    const result = await createNote(sectionId);

    if ('data' in result) {
      const { data } = result;

      navigateWithQP(`/sections/${data.section_id}/notes/${data.note_id}`);
    }
  }

  return (
    <SidebarToolbar title="Notes">
      {sectionId && (
        <>
          <ButtonIcon
            icon={faPlus}
            clickHandler={() => onCreateNote()}
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