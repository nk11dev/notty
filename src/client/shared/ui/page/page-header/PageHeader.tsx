import styles from './PageHeader.module.scss';

import React from 'react';

type Props = {
  children: React.ReactNode,
};

const PageHeader = (props: Props) => (
  <div className={styles.element}>
    {props.children}
  </div>
);

export default PageHeader;