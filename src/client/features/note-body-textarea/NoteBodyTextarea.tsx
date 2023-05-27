import styles from './NoteBodyTextarea.module.scss';

import React from 'react';
import { useParams } from 'react-router-dom';

import {
  useUpdateNoteField
} from '@/entities/note/hooks';

const NoteBodyTextarea = () => {
  const { noteId } = useParams();

  const [noteContent, onFieldChange] = useUpdateNoteField(noteId, 'body');

  return (
    <textarea
      className={styles.bodyTextarea}
      value={noteContent.body || ''}
      onChange={onFieldChange}
    />
  );
};

export default NoteBodyTextarea;