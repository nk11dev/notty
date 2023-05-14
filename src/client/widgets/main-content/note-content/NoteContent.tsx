import React from 'react';
import { useParams } from 'react-router-dom';

const NoteContent = () => {
  const { noteId } = useParams();

  return (
    <h1>
      Note {noteId}
    </h1>
  );
};

export default NoteContent;