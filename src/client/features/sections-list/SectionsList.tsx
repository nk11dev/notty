import React from 'react';
import { useLocation } from 'react-router-dom';

import SectionItem from '@/features/sections-list/section-item';
import SectionsContextMenu from '@/features/sections-context-menu';
import { useGetAllSectionsQuery } from '@/entities/section/api-slices';
import type { Section } from '@/entities/section/types';
import SidebarList from '@/shared/ui/layout/sidebar-list';
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

  if (data === null) return null;

  return (
    <>
      <SidebarList>
        {data.map((item: Section, index: number) => (
          <SectionItem
            key={index}
            url={`/sections/${item.section_id}${queryParams}`}
            id={item.section_id}
            title={item.title}
          />
        ))}
      </SidebarList>
      <SectionsContextMenu
        menuId="SECTIONS_CONTEXT_MENU_ID"
      />
    </>
  );
};

export default SectionsList;