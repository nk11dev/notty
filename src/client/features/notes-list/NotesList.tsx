import React from 'react';
import { useParams } from 'react-router-dom';

import { NOTES_CONTEXT_MENU_ID } from '@/app/constants/context-menu.constants';
import NotesContextMenu from '@/features/notes-context-menu';
import { useGetNotesBySectionQuery } from '@/entities/note/api-slices';
import { useNavigateDefaultNote } from '@/entities/note/hooks';
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

  useNavigateDefaultNote(sectionId);

  if (isError) return <ErrorMsg error={error} />;

  if (!data || data?.length <= 0) return null;

  return (
    <>
      <SidebarList>
        {data.map((item: Note, index: number) => (
          <NavItem
            key={index}
            url={`/sections/${item.section_id}/notes/${item.note_id}`}
            id={item.note_id}
            contextMenuId={NOTES_CONTEXT_MENU_ID}
            searchParamsOptions={{
              hideSidebarNav: true
            }}
          >
            {item.title}
          </NavItem>
        ))}
      </SidebarList>
      <NotesContextMenu />
    </>
  );
}

export default NotesList;