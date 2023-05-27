import styles from './NoteTitleInput.module.scss';

import React from 'react';
import { useParams } from 'react-router-dom';

import {
  useUpdateNoteField
} from '@/entities/note/hooks';

const NoteTitleInput = () => {
  const { noteId } = useParams();

  const [noteContent, onFieldChange] = useUpdateNoteField(noteId, 'title');

  return (
    <input
      className={styles.titleInput}
      type="text"
      value={noteContent.title}
      onChange={onFieldChange}
    />
  );
};

export default NoteTitleInput;