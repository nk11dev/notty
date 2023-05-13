import React from 'react';
import { useParams } from 'react-router-dom';

const NoteContent = () => {
  const { noteId } = useParams();

  return (
    <h4>
      Note {noteId}
    </h4>
  );
};

export default NoteContent;