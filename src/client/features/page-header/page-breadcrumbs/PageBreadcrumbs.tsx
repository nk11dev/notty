import styles from './PageBreadcrumbs.module.scss';

import React from 'react';
import { useParams } from 'react-router-dom';

import { useFolderState } from '@/entities/folder/hooks';
import { useNoteState } from '@/entities/note/hooks';

const PageBreadcrumbs = () => {
  const { folderSlug, noteSlug } = useParams();

  const { data: folderData } = useFolderState(folderSlug);
  const { data: noteData } = useNoteState(noteSlug);

  const breadcrumbs = [
    noteData?.folder_info?.title ?? folderData?.title,
    noteData?.title,
  ];

  return (
    <div className={styles.element}>
      {breadcrumbs.filter(item => !!item).join(' / ')}
    </div>
  );
};

export default PageBreadcrumbs;