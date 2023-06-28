import style from '@/shared/ui/sidebar/sidebar-list/SidebarList.module.scss';

import React from 'react';
import cn from 'classnames';

import { FOLDER_CONTEXT_MENU_ID } from '@/app/constants/context-menu.constants';
import type { FolderDto } from '@/entities/folder/types';
import SidebarList from '@/shared/ui/sidebar/sidebar-list';
import NavItem from '@/shared/ui/sidebar/nav-item';

type Props = {
  data: FolderDto[]
};

const FoldersList = (props: Props) => (
  <SidebarList>
    {props.data.map((item: FolderDto, index: number) => {
      const { id, title, notes_count } = item;

      return (
        <NavItem
          key={index}
          url={`/folders/${id}`}
          id={id}
          contextMenuId={FOLDER_CONTEXT_MENU_ID}
        >
          <div className={style.wrapperWithSuffix}>

            <span className={style.titleWithSuffix}>
              {title}
            </span>

            <span className={cn(style.suffixText, 'ms-2')}>
              {notes_count}
            </span>

          </div>
        </NavItem>
      )
    })}
  </SidebarList>
);

export default FoldersList;