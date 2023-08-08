import styles from './UserFormHeader.module.scss';

import React from 'react';

type Props = {
  children: React.ReactNode,
};

const UserFormHeader = (props: Props) => (
  <h1 className={styles.element}>
    {props.children}
  </h1>
);

export default UserFormHeader;