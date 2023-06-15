import styles from './ErrorMsg.module.scss';

import React from 'react';

import type { BaseQueryError } from '@/shared/types';

const ErrorMsg = (props: Partial<BaseQueryError>) => {
  const { status, data } = props;

  const details = [
    status,
    (typeof data === 'string') && data,
  ].filter(item => !!item);

  return (
    <div className={styles.element}>
      Error: {details.join(', ')}
    </div>
  );
}

export default ErrorMsg;