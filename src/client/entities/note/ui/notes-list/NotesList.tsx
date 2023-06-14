import React from 'react';

import { NOTES_CONTEXT_MENU_ID } from '@/app/constants/context-menu.constants';
import type { Note } from '@/entities/note/types';
import SidebarList from '@/shared/ui/sidebar/sidebar-list';
import NavItem from '@/shared/ui/sidebar/nav-item';

type Props = {
  data: Note[]
};

const NotesList = (props: Props) => (
  <SidebarList>
    {props.data.map((item: Note, index: number) => (
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
)

export default NotesList;