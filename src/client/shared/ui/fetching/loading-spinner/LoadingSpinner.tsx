import styles from './LoadingSpinner.module.scss';

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';

type Props = {
  icon: IconDefinition,
  size?: number,
};

const LoadingSpinner = (props: Props) => {
  const { icon, size } = props;

  if (!icon) return null;

  return (
    <span className={styles.spinnerWrapper}>
      <FontAwesomeIcon
        icon={icon}
        className="fa-spin-pulse"
        style={{
          width: size,
          height: size
        }}
      />
    </span>
  );
};

export default LoadingSpinner;