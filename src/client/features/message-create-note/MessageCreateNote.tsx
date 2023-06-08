import styles from './MessageCreateNote.module.scss';

import React from 'react';
import { useParams } from 'react-router-dom';
import cn from 'classnames';

import {
  useHandleCreateNote
} from '@/entities/note/hooks';

const MessageCreateNote = () => {
  const { sectionId } = useParams();
  const [onCreateNote] = useHandleCreateNote();

  return (
    <button
      type="button"
      className={cn(styles.element, 'btn btn-link')}
      onClick={() => onCreateNote(sectionId)}
    >
      Create new note
    </button>
  );
}

export default MessageCreateNote;