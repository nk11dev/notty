import React from 'react';
import { Link } from 'react-router-dom';

import { useFetch } from '@/shared/api';
import { Folder } from '@/entities/model/folder.types';

const FoldersList = () => {
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
        {data.map((folder: Folder, index: number) => (
          <li key={index}>
            <Link to={`sections/${folder.id}`}>
              {folder.text}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default FoldersList;