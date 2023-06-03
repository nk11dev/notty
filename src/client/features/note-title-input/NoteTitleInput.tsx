import styles from './NoteTitleInput.module.scss';

import React from 'react';

import { PAGE_TITLE_INPUT_EL_NAME } from '@/app/constants/elements.constants';
import {
  useUpdateNoteField
} from '@/entities/note/hooks';

const NoteTitleInput = () => {
  const [noteData, onFieldChange] = useUpdateNoteField('title');

  return (
    <input
      className={styles.titleInput}
      name={PAGE_TITLE_INPUT_EL_NAME}
      type="text"
      value={noteData.title}
      onChange={onFieldChange}
    />
  );
};

export default NoteTitleInput;