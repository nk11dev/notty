import styles from './NoteTitleInput.module.scss';

import React from 'react';
import type { ChangeEvent } from 'react';

import {
  useUpdateNoteField
} from '@/entities/note/hooks';

const NoteTitleInput = () => {
  const [noteData, setNoteData] = useUpdateNoteField('title');

  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNoteData(prevValue => ({
      ...prevValue,
      title: event.target.value
    }));
  };

  return (
    <input
      className={styles.titleInput}
      type="text"
      value={noteData.title}
      onChange={onInputChange}
      maxLength={30}
    />
  );
};

export default NoteTitleInput;