import styles from './RootLayout.module.scss';

import React from 'react';

type Props = {
  children: React.ReactNode
};

const RootLayout = (props: Props) => (
  <div className={styles.wrapper}>
    <section className={styles.content}>
      {props.children}
    </section>
  </div>
);

export default RootLayout;