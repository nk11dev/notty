import styles from './PageContent.module.scss';

import React from 'react';

type Props = {
  children: React.ReactNode,
};

const PageContent = (props: Props) => (
  <div className={styles.element}>
    {props.children}
  </div>
);

export default PageContent;