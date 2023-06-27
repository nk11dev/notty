import styles from './PageBreadcrumbs.module.scss';

import React from 'react';
import { useParams } from 'react-router-dom';

import { useFolderState } from '@/entities/section/hooks';
import { useNoteState } from '@/entities/note/hooks';

const PageBreadcrumbs = () => {
  const { folderSlug, noteSlug } = useParams();

  const { data: sectionData } = useFolderState(folderSlug);
  const { data: noteData } = useNoteState(noteSlug);

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