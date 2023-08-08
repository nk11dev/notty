import styles from './AuthMain.module.scss';

import React from 'react';

type Props = {
  children: React.ReactNode,
};

const AuthMain = (props: Props) => (
  <div className={styles.outer}>
    <div className={styles.inner}>
      {props.children}
    </div>
  </div>
);

export default AuthMain;