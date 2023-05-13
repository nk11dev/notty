import styles from '@/shared/ui/layout/sidebar-toolbar/SidebarToolbar.module.scss';

import React from 'react';
import { faRotate } from '@fortawesome/free-solid-svg-icons';
import cn from 'classnames';

import SidebarToolbar from '@/shared/ui/layout/sidebar-toolbar';
import ButtonIcon from '@/shared/ui/controls/button-icon';

const NotesToolbar = () => {
  const refetchNotes = () => {
    console.log('refetchNotes');
  }

  return (
    <SidebarToolbar title="Notes">
      <ButtonIcon
        icon={faRotate}
        clickHandler={() => refetchNotes()}
        cls={cn(styles.toolbarBtn, 'm-1')}
        size={16}
        tooltip="Refresh Notes"
      />
    </SidebarToolbar>
  );
}

export default NotesToolbar;