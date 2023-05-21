import style from '@/shared/ui/layout/sidebar-list/SidebarList.module.scss';

import React from 'react';
import cn from 'classnames';

import { SECTIONS_CONTEXT_MENU_ID } from '@/app/constants/context-menu.constants';
import SectionsContextMenu from '@/features/sections-context-menu';
import { useGetAllSectionsQuery } from '@/entities/section/api-slices';
import type { Section } from '@/entities/section/types';
import SidebarList from '@/shared/ui/layout/sidebar-list';
import NavItem from '@/shared/ui/layout/nav-item';
import ErrorMsg from '@/shared/ui/fetching/error-msg';

const SectionsList = () => {
  const {
    data,
    isError,
    error
  } = useGetAllSectionsQuery();

  if (isError) return <ErrorMsg error={error} />;

  if (!data || data?.length <= 0) return null;

  return (
    <>
      <SidebarList>
        {data.map((item: Section, index: number) => {
          const { section_id, title, notes_count } = item;

          return (
            <NavItem
              key={index}
              url={`/sections/${section_id}`}
              id={section_id}
              contextMenuId={SECTIONS_CONTEXT_MENU_ID}
            >
              {title}
              {(notes_count > 0) && (
                <span className={cn(style.suffixText, 'ms-1')}>
                  ({notes_count})
                </span>
              )}
            </NavItem>
          )
        })}
      </SidebarList>
      <SectionsContextMenu />
    </>
  );
};

export default SectionsList;