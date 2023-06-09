import styles from './NoteTitleInput.module.scss';

import React from 'react';
import type { ChangeEvent } from 'react';

import { PAGE_TITLE_INPUT_EL_NAME } from '@/app/constants/elements.constants';
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
      name={PAGE_TITLE_INPUT_EL_NAME}
      type="text"
      value={noteData.title}
      onChange={onInputChange}
    />
  );
};

export default NoteTitleInput;