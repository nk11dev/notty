import styles from './PageToolbar.module.scss';

import React from 'react';
import { HiDotsHorizontal } from 'react-icons/hi';
import { AiOutlineStar } from 'react-icons/ai';

import HeaderButton from '@/shared/ui/controls/header-button';

const PageToolbar = () => (
  <div className={styles.element}>
    <HeaderButton isDisabled>
      <AiOutlineStar />
    </HeaderButton>

    <HeaderButton isDisabled>
      <HiDotsHorizontal />
    </HeaderButton>
  </div>
);

export default PageToolbar;