import styles from './AuthLayout.module.scss';

import React from 'react';
import { Outlet } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';

const AuthLayout = () => (
  <div className={styles.bg}>
    <div className={styles.outer}>
      <div className={styles.inner}>
        <Alert className={styles.alert} variant="light">
          {<Outlet />}
        </Alert>
      </div>
    </div>
  </div>
);

export default AuthLayout;