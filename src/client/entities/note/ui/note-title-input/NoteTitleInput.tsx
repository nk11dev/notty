import styles from './NoteTitleInput.module.scss';

import React, { useContext } from 'react';
import type { ChangeEvent } from 'react';

import { useUpdateNoteField } from '@/entities/note/hooks';
import { EditorContext } from '@/shared/contexts/editor-context';

const NoteTitleInput = () => {
  const [noteData, setNoteData] = useUpdateNoteField('title');

  const { disableEditorMenu } = useContext(EditorContext);

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
      onFocus={() => disableEditorMenu(true)}
      onBlur={() => disableEditorMenu(false)}
      maxLength={30}
    />
  );
};

export default NoteTitleInput;