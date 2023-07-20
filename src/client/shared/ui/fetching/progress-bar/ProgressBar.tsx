import styles from './ProgressBar.module.scss';

import React from 'react';
import cn from 'classnames';

const ProgressBar = () => (
  <div className={styles.wrapper}>
    <div className={cn(styles.progressBar, styles.striped)} />
  </div>
);

export default ProgressBar;