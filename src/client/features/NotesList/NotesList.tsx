import React from 'react';

import { Note } from '@/entities/model/note.types';

type Props = {
  notes: Note[]
};

const NotesList = (props: Props) => {
  const { notes } = props;

  return (
    <>
      <div>Notes List:</div>
      <ul>
        {notes.map((item, index) => (
          <li key={index}>
            {item.text}
          </li>
        ))}
      </ul>
    </>
  );
}

export default NotesList;