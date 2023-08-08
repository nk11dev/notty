import styles from './AuthTitle.module.scss';

import React from 'react';

type Props = {
  children: React.ReactNode,
};

const AuthTitle = (props: Props) => (
  <h1 className={styles.element}>
    {props.children}
  </h1>
);

export default AuthTitle;