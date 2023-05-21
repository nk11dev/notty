import styles from './NoteContent.module.scss';

import React from 'react';
import { useParams } from 'react-router-dom';
import { faCalendarDays, faPencil } from '@fortawesome/free-solid-svg-icons';

import { useGetNoteQuery } from '@/entities/note/api-slices';
import ErrorMsg from '@/shared/ui/fetching/error-msg';
import NoteField from '@/widgets/main-content/note-content/note-field';

const NoteContent = () => {
  const { noteId } = useParams();

  const {
    data,
    isError,
    error
  } = useGetNoteQuery(noteId, {
    skip: !noteId,
    refetchOnMountOrArgChange: true
  });

  if (isError) return <ErrorMsg error={error} />;

  if (!data) return null;

  return (
    <>
      <h1 className={styles.title}>
        {data.title}
      </h1>
      <NoteField
        icon={faCalendarDays}
        data={data.created_at}
      />
      <NoteField
        icon={faPencil}
        data={data.updated_at}
      />
    </>
  );
};

export default NoteContent;