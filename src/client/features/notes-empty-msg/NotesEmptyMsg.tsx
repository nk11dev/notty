import styles from './NotesEmptyMsg.module.scss';

import React from 'react';
import { useParams } from 'react-router-dom';
import cn from 'classnames';

import {
  useHandleCreateNote
} from '@/entities/note/hooks';

const NotesEmptyMsg = () => {
  const { sectionId } = useParams();
  const [onCreateNote] = useHandleCreateNote();

  return (
    <div className={styles.emptyText}>
      <div>It&rsquo;s empty here.</div>

      <button
        type="button"
        className={cn(styles.textBtn, 'btn btn-link')}
        onClick={() => onCreateNote(sectionId)}
      >
        Create new note
      </button>
      <span> to start writing</span>
    </div>
  );
}

export default NotesEmptyMsg;