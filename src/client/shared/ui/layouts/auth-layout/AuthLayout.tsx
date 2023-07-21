import styles from './AuthLayout.module.scss';

import React from 'react';
import { Outlet } from 'react-router-dom';

type Props = {
  children?: React.ReactNode,
};

const AuthLayout = (props: Props) => (
  <div className={styles.wrapper}>
    <div className={styles.inner}>
      {
        props.children
          ? props.children
          : <Outlet />
      }
    </div>
  </div>
);

export default AuthLayout;