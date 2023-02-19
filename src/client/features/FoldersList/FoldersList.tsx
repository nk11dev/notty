import React from 'react';
import { Link } from 'react-router-dom';

const FoldersList = () => {

  const foldersList = [
    { id: 1, text: 'Folder 1' },
    { id: 2, text: 'Folder 2' },
    { id: 3, text: 'Folder 3' },
  ];

  return (
    <>
      <div>Folders List:</div>

      <ul>
        {foldersList.map((item, index) => (
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