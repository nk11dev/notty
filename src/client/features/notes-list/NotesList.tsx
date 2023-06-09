import React from 'react';
import { useParams } from 'react-router-dom';

import { NOTES_CONTEXT_MENU_ID } from '@/app/constants/context-menu.constants';
import NotesContextMenu from '@/features/notes-context-menu';
import NotesEmptyMsg from '@/features/notes-empty-msg';
import { useGetNotesBySectionQuery } from '@/entities/note/api-slices';
import type { Note } from '@/entities/note/types';
import SidebarList from '@/shared/ui/layout/sidebar-list';
import NavItem from '@/shared/ui/layout/nav-item';
import ErrorMsg from '@/shared/ui/fetching/error-msg';

const NotesList = () => {
  const { sectionId } = useParams();

  const {
    data,
    isError,
    error
  } = useGetNotesBySectionQuery(sectionId, {
    skip: !sectionId,
    refetchOnMountOrArgChange: true
  });

  if (isError) return <ErrorMsg error={error} />;

  if (!data) return null;

  return data?.length > 0
    ? (<>
      <SidebarList>
        {data.map((item: Note, index: number) => (
          <NavItem
            key={index}
            url={`/sections/${item.section_id}/notes/${item.note_id}`}
            id={item.note_id}
            contextMenuId={NOTES_CONTEXT_MENU_ID}
            searchParamsOptions={{
              hideSidebarOnMobile: true
            }}
          >
            {item.title}
          </NavItem>
        ))}
      </SidebarList>
      <NotesContextMenu />
    </>)
    : <NotesEmptyMsg />;
}

export default NotesList;