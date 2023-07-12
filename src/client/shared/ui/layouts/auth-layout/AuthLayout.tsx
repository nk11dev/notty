import styles from './AuthLayout.module.scss';

import React from 'react';

type Props = {
  children: React.ReactNode,
};

const AuthLayout = (props: Props) => (
  <div className={styles.wrapper}>
    <div className={styles.inner}>
      {props.children}
    </div>
  </div>
);

export default AuthLayout;