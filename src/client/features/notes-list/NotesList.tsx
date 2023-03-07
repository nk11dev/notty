import React from 'react';
import { useParams } from 'react-router-dom';

import { useFetch } from '@/shared/api';
import { Note } from '@/entities/model/note.types';

const NotesList = () => {
  const { sectionId } = useParams();

  const {
    data,
    isLoading,
    error
  } = useFetch(`/sections/${sectionId}`);

  if (isLoading) return <p>Loading...</p>

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
                    {item.title}
                  </li>
                ))}
              </ul>
            </>
          )
          : <p>Notes for section with id {sectionId} are not found</p>
      }
    </>
  );
}

export default NotesList;