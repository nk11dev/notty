import styles from './AuthMainContent.module.scss';

import React from 'react';

type Props = {
  children: React.ReactNode,
};

const AuthMainContent = (props: Props) => (
  <div className={styles.outer}>
    <div className={styles.inner}>
      {props.children}
    </div>
  </div>
);

export default AuthMainContent;