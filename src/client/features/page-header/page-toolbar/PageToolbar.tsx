import styles from './PageToolbar.module.scss';

import React from 'react';
import { HiDotsHorizontal } from 'react-icons/hi';

import HeaderButton from '@/shared/ui/controls/header-button';
import BookmarkButton from '@/features/page-header/page-toolbar/bookmark-button';

const PageToolbar = () => (
  <div className={styles.element}>
    <BookmarkButton />

    <HeaderButton isDisabled>
      <HiDotsHorizontal />
    </HeaderButton>
  </div>
);

export default PageToolbar;