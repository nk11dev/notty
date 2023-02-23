import React from 'react';
import { useParams } from 'react-router-dom';

import NotesList from '@/features/NotesList';
import foldersData from '@/data/folders.json';

const FolderPage = () => {
  const { folderId } = useParams();
  const { list: folders } = foldersData;

  const folderData = folders.find(i =>
    i.id.toString() === folderId.toString()
  );

  const content = (
    (typeof folderData !== 'undefined') &&
    folderData?.notes?.length
  )
    ? <NotesList notes={folderData.notes} />
    : `Notes for folder with id "${folderId}" are not found`;

  return (
    <>
      <h1>Folder {folderId}</h1>
      {content}
    </>
  );
};

export default FolderPage;