import styles from './NoteHeader.module.scss';

import React from 'react';

import { useSectionState } from '@/entities/section/hooks';
import { useNoteState } from '@/entities/note/hooks';

const NoteHeader = () => {
  const sectionState = useSectionState();
  const noteState = useNoteState();

  return (
    <div className={styles.element}>
      {sectionState?.title} / {noteState?.title}
    </div>
  );
};

export default NoteHeader;