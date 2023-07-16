import styles from './UserPanel.module.scss';

import React from 'react';

type RowProps = {
  label: string,
  value: string
};

const UserPanel = () => {
  const userName = 'John Doe';
  const userEmail = 'john.doe@gmail.com';

  const Row = ({ label, value }: RowProps) => (
    <div className={styles.row}>
      <span className={styles.label}>{label}:</span>
      <span>{value}</span>
    </div>
  );

  return (
    <div className={styles.element}>
      {userName && (
        <Row label="Name" value={userName} />
      )}
      <Row label="Email" value={userEmail} />
      <div className={styles.separator} />
    </div>
  )
};

export default UserPanel;