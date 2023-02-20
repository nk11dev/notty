import React from 'react';
import { Link } from 'react-router-dom';

import foldersData from '@/data/folders.json';

const FoldersList = () => {
  const { list: folders } = foldersData;

  return (
    <>
      <div>Folders List:</div>

      <ul>
        {folders.map((item, index) => (
          <li key={index}>
            <Link to={`folders/${item.id}`}>
              {item.text}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default FoldersList;