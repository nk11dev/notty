import styles from './NoteTitleInput.module.scss';

import React, { useState, useEffect } from 'react';
import type { ChangeEvent } from 'react';
import { useParams } from 'react-router-dom';

import {
  notesApi,
  useUpdateNoteMutation
} from '@/entities/note/api-slices';
import { useDebounce } from '@/shared/hooks';

type NoteContent = {
  id: number | null,
  title: string,
};

const defaultContent: NoteContent = {
  id: null,
  title: '',
};

const NoteTitleInput = () => {
  const { noteId } = useParams();

  const [updateNote] = useUpdateNoteMutation();

  const { currentData } = notesApi.endpoints.getNote.useQueryState(noteId);

  const [noteContent, setContent] = useState(defaultContent);
  const debouncedContent = useDebounce(noteContent, 300);

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

  return (
    <input
      className={styles.titleInput}
      type="text"
      value={noteContent.title}
      onChange={onTitleChange}
    />
  );
};

export default NoteTitleInput;