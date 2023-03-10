import React from 'react';
import { Link } from 'react-router-dom';

import { useFetch } from '@/shared/api';

import { Section } from '@/entities/model/section.types';
import LoadingMsg from '@/shared/ui/fetching/loading-msg';
import ErrorMsg from '@/shared/ui/fetching/error-msg';

const SectionsList = () => {
  const {
    data,
    isLoading,
    error
  } = useFetch('/sections');

  if (isLoading) return <LoadingMsg />;

  if (error) return <ErrorMsg error={error}/>;

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