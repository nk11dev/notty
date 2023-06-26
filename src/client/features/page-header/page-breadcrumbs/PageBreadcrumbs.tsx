import styles from './PageBreadcrumbs.module.scss';

import React from 'react';
import { useParams } from 'react-router-dom';

import { useSectionState } from '@/entities/section/hooks';
import { useNoteState } from '@/entities/note/hooks';

const PageBreadcrumbs = () => {
  const { folderSlug, noteId } = useParams();

  const { data: sectionData } = useSectionState(folderSlug);
  const { data: noteData } = useNoteState(noteId);

  const breadcrumbs = [
    noteData?.section?.title ?? sectionData?.title,
    noteData?.title,
  ];

  return (
    <div className={styles.element}>
      {breadcrumbs.filter(item => !!item).join(' / ')}
    </div>
  );
};

export default PageBreadcrumbs;