import styles from './PageToolbar.module.scss';

import React from 'react';

import BookmarkButton from '@/features/page-header/page-toolbar/bookmark-button';
import DotsButton from '@/features/page-header/page-toolbar/dots-button';

const PageToolbar = () => (
  <div className={styles.element}>
    <BookmarkButton />
    <DotsButton />
  </div>
);

export default PageToolbar;