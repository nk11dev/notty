import styles from './UserFormHeader.module.scss';

import React from 'react';

type Props = {
  heading: string,
  text?: string,
};

const UserFormHeader = (props: Props) => (
  <div className={styles.element}>
    <h1 className={styles.heading}>
      <b>{props.heading}</b>
    </h1>
    {props.text && (
      <p>{props.text}</p>
    )}
  </div>
);

export default UserFormHeader;