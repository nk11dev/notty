import React from 'react';

import SectionItem from '@/features/sections-list/section-item';
import SectionsContextMenu from '@/features/sections-context-menu';
import { useGetAllSectionsQuery } from '@/entities/section/api-slices';
import type { Section } from '@/entities/section/types';
import LoadingMsg from '@/shared/ui/fetching/loading-msg';
import ErrorMsg from '@/shared/ui/fetching/error-msg';

const SectionsList = () => {
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
      <ul className='sections-list'>
        {data.map((item: Section, index: number) => (
          <SectionItem
            key={index}
            url={`/sections/${item.section_id}`}
            id={item.section_id}
            title={item.title}
          />
        ))}
      </ul>
      <SectionsContextMenu
        menuId="SECTIONS_CONTEXT_MENU_ID"
      />
    </>
  );
};

export default SectionsList;