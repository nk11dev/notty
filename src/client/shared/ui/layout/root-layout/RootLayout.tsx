import styles from './RootLayout.module.scss';

import React from 'react';

import Header from '@/shared/ui/layout/header';

type Props = {
  children: React.ReactNode
};

const RootLayout = (props: Props) => (
  <div className={styles.wrapper}>
    <Header />

    <section className={styles.content}>
      {props.children}
    </section>
  </div>
);

export default RootLayout;