import styles from './LoadingSpinner.module.scss';

import React from 'react';
import { IoSync } from 'react-icons/io5';

import IconButton from '@/shared/ui/controls/icon-button';

const LoadingSpinner = () => (
  <IconButton
    buttonType="toolbar"
    tooltip="Loading..."
    icon={<IoSync className={styles.spinner} />}
  />
);

export default LoadingSpinner;