import styles from './ContentBody.module.scss';

import React from 'react';

type Props = {
  children: React.ReactNode,
};

const ContentBody = (props: Props) => (
  <div className={styles.contentBody}>
    {props.children}
  </div>
);

export default ContentBody;