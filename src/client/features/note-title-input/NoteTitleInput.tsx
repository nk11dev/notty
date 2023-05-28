import styles from './NoteTitleInput.module.scss';

import React from 'react';
import { useParams } from 'react-router-dom';

import { PAGE_TITLE_INPUT_EL_NAME } from '@/app/constants/elements.constants';
import {
  useUpdateNoteField
} from '@/entities/note/hooks';

const NoteTitleInput = () => {
  const { noteId } = useParams();

  const [noteContent, onFieldChange] = useUpdateNoteField(noteId, 'title');

  return (
    <input
      className={styles.titleInput}
      name={PAGE_TITLE_INPUT_EL_NAME}
      type="text"
      value={noteContent.title}
      onChange={onFieldChange}
    />
  );
};

export default NoteTitleInput;