import styles from './PageLayout.module.scss';

import React from 'react';

import Header from '@/shared/ui/layout/header';

type Props = {
  children: React.ReactNode
};

const PageLayout = (props: Props) => (
  <div className={styles.wrapper}>
    <Header />

    <section className={styles.content}>
      {props.children}
    </section>
  </div>
);

export default PageLayout;