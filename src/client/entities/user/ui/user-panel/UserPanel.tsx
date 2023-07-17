import styles from './UserPanel.module.scss';

import React from 'react';

import { useUserState } from '@/entities/user/hooks';

type RowProps = {
  label: string,
  value: string | undefined
};

const UserPanel = () => {
  const { data } = useUserState();

  const Row = ({ label, value }: RowProps) => (
    <div className={styles.row}>
      <span className={styles.label}>{label}:</span>
      {value && <span>{value}</span>}
    </div>
  );

  return (
    <div className={styles.element}>
      <Row label="Name" value={data?.username} />
      <Row label="Email" value={data?.email} />
      <div className={styles.separator} />
    </div>
  )
};

export default UserPanel;