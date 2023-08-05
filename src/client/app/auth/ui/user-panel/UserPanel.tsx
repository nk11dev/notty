import styles from './UserPanel.module.scss';

import React from 'react';

import { useAuth } from '@/app/auth/hooks';

type RowProps = {
  label: string,
  value: string | undefined
};

const UserPanel = () => {
  const { user } = useAuth();

  const Row = ({ label, value }: RowProps) => (
    <div className={styles.row}>
      <span className={styles.label}>{label}:</span>
      {value && <span>{value}</span>}
    </div>
  );

  return (
    <div className={styles.element}>
      <Row label="Name" value={user?.username} />
      <Row label="Email" value={user?.email} />
      <div className={styles.separator} />
    </div>
  )
};

export default UserPanel;