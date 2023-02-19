import React from 'react';
import { useParams } from 'react-router-dom';

import NotesList from '@/features/NotesList';

const FolderPage = () => {
  const { folderId } = useParams();

  return (
    <>
      <h1>Folder {folderId}</h1>
      <NotesList />
    </>
  );
};

export default FolderPage;