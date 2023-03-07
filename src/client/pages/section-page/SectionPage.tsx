import React from 'react';
import { useParams } from 'react-router-dom';

import NotesList from '@/features/notes-list';

const SectionPage = () => {
  const { sectionId } = useParams();

  return (
    <>
      <h1>Section {sectionId}</h1>
      <NotesList />
    </>
  );
};

export default SectionPage;