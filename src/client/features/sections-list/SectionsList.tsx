import React from 'react';
import { Link } from 'react-router-dom';

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
    <ul className='sections-list'>
      {data.map((item: Section, index: number) => (
        <li key={index}>
          <Link to={`/sections/${item.section_id}`}>
            {item.title}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default SectionsList;