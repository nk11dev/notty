import styles from './PageBreadcrumbs.module.scss';

import React from 'react';

type Props = {
  children: React.ReactNode,
};

const PageBreadcrumbs = (props: Props) => (
  <div className={styles.element}>
    {props.children}
  </div>
);

export default PageBreadcrumbs;