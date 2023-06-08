import styles from './PageHeader.module.scss';

import React from 'react';
import { useParams } from 'react-router-dom';

import PageBreadcrumbs from '@/features/page-header/page-breadcrumbs';
import PageToolbar from '@/features/page-header/page-toolbar';

const PageHeader = () => {
  const { noteId } = useParams();

  return (
    <div className={styles.element}>
      <PageBreadcrumbs />

      {noteId && <PageToolbar />}
    </div>
  );
};

export default PageHeader;