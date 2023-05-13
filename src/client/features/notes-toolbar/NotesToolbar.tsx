import styles from '@/shared/ui/layout/sidebar-toolbar/SidebarToolbar.module.scss';

import React from 'react';
import { useParams } from 'react-router-dom';
import { faRotate } from '@fortawesome/free-solid-svg-icons';
import cn from 'classnames';

import SidebarToolbar from '@/shared/ui/layout/sidebar-toolbar';
import ButtonIcon from '@/shared/ui/controls/button-icon';

import {
  useLazyGetNotesBySectionQuery,
} from '@/entities/note/api-slices';

const NotesToolbar = () => {
  const { sectionId } = useParams();

  const [refetchNotesBySection] = useLazyGetNotesBySectionQuery();

  return (
    <SidebarToolbar title="Notes">
      {sectionId && (
        <ButtonIcon
          icon={faRotate}
          clickHandler={() => refetchNotesBySection(sectionId)}
          cls={cn(styles.toolbarBtn, 'm-1')}
          size={16}
          tooltip="Refetch Notes"
        />
      )}
    </SidebarToolbar>
  );
}

export default NotesToolbar;