import React from 'react';

import { NOTES_CONTEXT_MENU_ID } from '@/app/constants/context-menu.constants';
import type { NoteDto } from '@/entities/note/types';
import SidebarList from '@/shared/ui/sidebar/sidebar-list';
import NavItem from '@/shared/ui/sidebar/nav-item';

type Props = {
  data: NoteDto[]
};

const NotesList = (props: Props) => (
  <SidebarList>
    {props.data.map((item: NoteDto, index: number) => (
      <NavItem
        key={index}
        url={`/folders/${item.folder_id}/notes/${item.id}`}
        id={item.id}
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