import styles from './PageToolbar.module.scss';

import React from 'react';
import { HiDotsHorizontal } from 'react-icons/hi';

import HeaderButton from '@/shared/ui/controls/header-button';
import FavoriteButton from '@/features/page-header/page-toolbar/favorite-button';

const PageToolbar = () => (
  <div className={styles.element}>
    <FavoriteButton />

    <HeaderButton isDisabled>
      <HiDotsHorizontal />
    </HeaderButton>
  </div>
);

export default PageToolbar;