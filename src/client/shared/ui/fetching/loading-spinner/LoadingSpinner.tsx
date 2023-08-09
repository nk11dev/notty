import styles from './LoadingSpinner.module.scss';

import React from 'react';
import { IoSync } from 'react-icons/io5';

import HeaderButton from '@/shared/ui/controls/header-button';

const LoadingSpinner = () => (
  <HeaderButton>
    <IoSync className={styles.spinner} />
  </HeaderButton>
);

export default LoadingSpinner;