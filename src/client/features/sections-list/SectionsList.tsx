import React from 'react';
import { Link } from 'react-router-dom';

import { useFetch } from '@/shared/api';
import { Section } from '@/entities/model/section.types';

const SectionsList = () => {
  const {
    data,
    isLoading,
    error
  } = useFetch('/sections');

  if (isLoading) return <p>Loading...</p>

  if (error) return <p>{`Error. Name: "${error.name}", Message: "${error.message}"`}</p>;

  if (data === null) return null;

  return (
    <>
      <div>Sections List:</div>

      <ul>
        {data.map((item: Section, index: number) => (
          <li key={index}>
            <Link to={`sections/${item.section_id}`}>
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default SectionsList;