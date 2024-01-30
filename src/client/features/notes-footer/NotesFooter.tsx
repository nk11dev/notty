import React from 'react';
import { useParams } from 'react-router-dom';
import { BsPlusLg } from 'react-icons/bs';

import type { NoteOptionalRouteSlugs } from '@/app/routing/types';
import { useHandleCreateNote } from '@/entities/note/hooks';
import TextButton from '@/shared/ui/controls/text-button';
import SidebarFooter from '@/shared/ui/sidebar/sidebar-footer';

const NotesFooter = () => {
  const { folderSlug } = useParams() as NoteOptionalRouteSlugs;

  const [onCreate] = useHandleCreateNote();

  return (!!folderSlug && (
    <SidebarFooter>
      <TextButton
        text="Add note"
        icon={<BsPlusLg size={22} />}
        onClick={() => onCreate(folderSlug)}
      />
    </SidebarFooter>
  ));
};

export default NotesFooter;