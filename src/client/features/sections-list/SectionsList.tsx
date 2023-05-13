import React from 'react';
import { useLocation } from 'react-router-dom';

import { SECTIONS_CONTEXT_MENU_ID } from '@/app/constants/context-menu.constants';
import SectionsContextMenu from '@/features/sections-context-menu';
import { useGetAllSectionsQuery } from '@/entities/section/api-slices';
import type { Section } from '@/entities/section/types';
import SidebarList from '@/shared/ui/layout/sidebar-list';
import NavItem from '@/shared/ui/layout/nav-item';
import LoadingMsg from '@/shared/ui/fetching/loading-msg';
import ErrorMsg from '@/shared/ui/fetching/error-msg';

const SectionsList = () => {
  const { search: queryParams } = useLocation();

  const {
    data,
    isFetching,
    isError,
    error
  } = useGetAllSectionsQuery();

  if (isFetching) return <LoadingMsg />;

  if (isError) return <ErrorMsg error={error} />;

  if (!data || data?.length <= 0) return null;

  return (
    <>
      <SidebarList>
        {data.map((item: Section, index: number) => (
          <NavItem
            key={index}
            url={`/sections/${item.section_id}${queryParams}`}
            id={item.section_id}
            title={item.title}
            contextMenuId={SECTIONS_CONTEXT_MENU_ID}
          />
        ))}
      </SidebarList>
      <SectionsContextMenu />
    </>
  );
};

export default SectionsList;