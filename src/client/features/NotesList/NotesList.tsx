import React from 'react';

type Note = {
  id: number;
  text: string;
};

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