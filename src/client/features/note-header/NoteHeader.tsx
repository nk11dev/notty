import styles from './NoteHeader.module.scss';

import React from 'react';
import { HiDotsHorizontal } from 'react-icons/hi';
import { AiOutlineStar } from 'react-icons/ai';

import { useSectionState } from '@/entities/section/hooks';
import { useNoteState } from '@/entities/note/hooks';
import HeaderButton from '@/shared/ui/controls/header-button';

const NoteHeader = () => {
  const sectionState = useSectionState();
  const noteState = useNoteState();

  return (
    <div className={styles.element}>
      <div className={styles.breadcrumbs}>
        {sectionState?.title} / {noteState?.title}
      </div>

      <div className={styles.headerControls}>
        <HeaderButton isDisabled>
          <AiOutlineStar />
        </HeaderButton>
        
        <HeaderButton isDisabled>
          <HiDotsHorizontal />
        </HeaderButton>
      </div>
    </div>
  );
};

export default NoteHeader;