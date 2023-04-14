import styles from './StylesExample.module.scss';

import React from 'react';

type Props = {
  children: React.ReactNode
};

const StylesExample = (props: Props) => (
  <div className={styles.example}>
    {props.children}
  </div>
);

export default StylesExample;