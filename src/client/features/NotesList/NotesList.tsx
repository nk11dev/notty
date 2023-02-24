import React from 'react';
import { useParams } from 'react-router-dom';

import { useFetch } from '@/shared/api';
import { Note } from '@/entities/model/note.types';

const NotesList = () => {
  const { folderId } = useParams();

  const {
    data,
    isLoading,
    error
  } = useFetch(`/folders/${folderId}`);

  if (isLoading) return <p>Loading notes...</p>

  if (error) return <p>{`Error. Name: "${error.name}", Message: "${error.message}"`}</p>;

  if (data === null) return null;

  return (
    <>
      {
        data?.notes?.length
          ? (
            <>
              <div>Notes List:</div>
              <ul>
                {data.notes.map((item: Note, index: number) => (
                  <li key={index}>
                    {item.text}
                  </li>
                ))}
              </ul>
            </>
          )
          : <p>Notes for folder with id {folderId} are not found</p>
      }
    </>
  );
}

export default NotesList;