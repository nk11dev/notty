import styles from './PageBreadcrumbs.module.scss';

import React from 'react';
import { useParams } from 'react-router-dom';

import { useSectionState } from '@/entities/section/hooks';
import { useNoteState } from '@/entities/note/hooks';

const PageBreadcrumbs = () => {
  const { sectionId, noteId } = useParams();

  const { data: sectionData } = useSectionState(sectionId);
  const { data: noteData } = useNoteState(noteId);

  const breadcrumbs = [
    sectionData?.title,
    noteData?.title,
  ];

  return (
    <div className={styles.element}>
      {breadcrumbs.filter(item => !!item).join(' / ')}
    </div>
  );
};

export default PageBreadcrumbs;