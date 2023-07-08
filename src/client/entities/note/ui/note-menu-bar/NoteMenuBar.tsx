import styles from './NoteMenuBar.module.scss';

import React from 'react';

import BookmarkButton from '@/entities/note/ui/note-menu-bar/bookmark-button';
import DotsButton from '@/entities/note/ui/note-menu-bar/dots-button';

const NoteMenuBar = () => (
  <div className={styles.element}>
    <BookmarkButton />
    <DotsButton />
  </div>
);

export default NoteMenuBar;