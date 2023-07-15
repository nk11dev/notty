import styles from './ErrorMsg.module.scss';

import React from 'react';

import type { BaseQueryError } from '@/shared/types';

const ErrorMsg = (props: Partial<BaseQueryError>) => {
  const { status, data } = props;

  const message = data?.message
    ? data.message
    : data;

  const details = [
    status,
    (typeof message === 'string') && message,
  ].filter(item => !!item);

  return (
    <div className={styles.element}>
      Error: {details.join(', ')}
    </div>
  );
}

export default ErrorMsg;