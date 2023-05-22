import styles from './NoteContent.module.scss';

import React, { useState, useEffect } from 'react';
import type { ChangeEvent } from 'react';
import { useParams } from 'react-router-dom';
import { faCalendarDays, faPencil } from '@fortawesome/free-solid-svg-icons';

import {
  useGetNoteQuery,
  useUpdateNoteMutation
} from '@/entities/note/api-slices';
import { useDebounce } from '@/shared/hooks';
import ErrorMsg from '@/shared/ui/fetching/error-msg';
import NoteField from '@/widgets/main-content/note-content/note-field';

type NoteContent = {
  id: number | null,
  title: string,
};

const defaultContent: NoteContent = {
  id: null,
  title: '',
};

const NoteContent = () => {
  const { noteId } = useParams();

  const [updateNote] = useUpdateNoteMutation();

  const {
    currentData,
    isError,
    error
  } = useGetNoteQuery(noteId, {
    skip: !noteId,
    refetchOnMountOrArgChange: true
  });

  const [noteContent, setContent] = useState(defaultContent);
  const debouncedContent = useDebounce(noteContent, 300)

  useEffect(() => {
    if (currentData) {
      setContent({
        id: currentData.note_id,
        title: currentData.title
      });
    }
  }, [currentData])

  useEffect(() => {
    if (
      (debouncedContent.id === currentData?.note_id) &&
      (debouncedContent.title !== currentData?.title)
    ) {
      updateNote(debouncedContent);
    }
  }, [debouncedContent, currentData, updateNote])

  const onTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setContent(prevValue => ({
      ...prevValue,
      title: event.target.value
    }));
  }

  if (isError) return <ErrorMsg error={error} />;

  if (!currentData) return null;

  return (
    <>
      <input
        className={styles.titleInput}
        type="text"
        value={noteContent.title}
        onChange={onTitleChange}
      />

      <div>
        <NoteField
          icon={faCalendarDays}
          data={currentData.created_at}
        />
        <NoteField
          icon={faPencil}
          data={currentData.updated_at}
        />
      </div>
    </>
  );
};

export default NoteContent;