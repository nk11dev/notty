import styles from './MessageCreateNote.module.scss';

import type { FolderRouteSlugs } from '@/app/routing/types';
import React from 'react';
import { useParams } from 'react-router-dom';
import cn from 'classnames';

import {
  useHandleCreateNote
} from '@/entities/note/hooks';

const MessageCreateNote = () => {
  const { folderSlug } = useParams() as FolderRouteSlugs;
  const [onCreateNote] = useHandleCreateNote();

  return (
    <div>
      <button
        type="button"
        className={cn(styles.element, 'btn btn-link')}
        onClick={() => onCreateNote(folderSlug)}
      >
        Create new note
      </button>
    </div>
  );
}

export default MessageCreateNote;