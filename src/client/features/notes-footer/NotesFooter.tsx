import React from 'react';
import { useParams } from 'react-router-dom';
import { BsPlusLg } from 'react-icons/bs';

import type { NoteOptionalRouteSlugs } from '@/app/routing/types';
import { useHandleCreateNote } from '@/entities/note/hooks';
import { useFolderState } from '@/entities/folder/hooks';
import TextButton from '@/shared/ui/controls/text-button';
import SidebarFooter from '@/shared/ui/sidebar/sidebar-footer';

const NotesFooter = () => {
  const { folderSlug } = useParams() as NoteOptionalRouteSlugs;

  const { isError } = useFolderState(folderSlug);
  const [onCreate] = useHandleCreateNote();

  if (isError || !folderSlug) {
    return null;
  }

  return (
    <SidebarFooter>
      <TextButton
        text="Add note"
        icon={<BsPlusLg size={22} />}
        onClick={() => onCreate(folderSlug)}
      />
    </SidebarFooter>
  )
};

export default NotesFooter;