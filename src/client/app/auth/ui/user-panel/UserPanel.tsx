import styles from './UserPanel.module.scss';

import React from 'react';
import cn from 'classnames';

import { useAuth } from '@/app/auth/hooks';

type RowProps = {
  value: string | undefined,
  cls?: string,
};

const UserPanel = () => {
  const { user } = useAuth();

  const Row = ({ value, cls }: RowProps) => value && (
    <div className={cn(styles.row, cls)}>
      {value}
    </div>
  );

  return (
    <div className={styles.element}>
      <Row value={user?.username} />
      <Row value={user?.email} cls={styles.email} />
      <div className={styles.separator} />
    </div>
  )
};

export default UserPanel;