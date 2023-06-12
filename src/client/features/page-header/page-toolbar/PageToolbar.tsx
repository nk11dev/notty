import styles from './PageToolbar.module.scss';

import React from 'react';
import { IoEllipsisHorizontal } from 'react-icons/io5';

import HeaderButton from '@/shared/ui/controls/header-button';
import BookmarkButton from '@/features/page-header/page-toolbar/bookmark-button';

const PageToolbar = () => (
  <div className={styles.element}>
    <BookmarkButton />

    <HeaderButton isDisabled>
      <IoEllipsisHorizontal />
    </HeaderButton>
  </div>
);

export default PageToolbar;