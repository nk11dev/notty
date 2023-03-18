import React from 'react';
import { useParams } from 'react-router-dom';

import { useGetSectionQuery } from '@/entities/section/api-slices';
import type { Note } from '@/entities/note/types';
import LoadingMsg from '@/shared/ui/fetching/loading-msg';
import ErrorMsg from '@/shared/ui/fetching/error-msg';

const NotesList = () => {
  const { sectionId } = useParams();

  const {
    data,
    isFetching,
    isError,
    error
  } = useGetSectionQuery(sectionId);

  if (isFetching) return <LoadingMsg />;

  if (isError) return <ErrorMsg error={error} />;

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