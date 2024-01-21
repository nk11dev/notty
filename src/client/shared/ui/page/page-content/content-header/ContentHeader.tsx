import styles from './ContentHeader.module.scss';

import React from 'react';

type Props = {
  children: React.ReactNode,
};

const ContentHeader = (props: Props) => (
  <div className={styles.contentHeader}>
    {props.children}
  </div>
);

export default ContentHeader;