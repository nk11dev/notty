import styles from './TwoColumns.module.scss';

import React from 'react';
import cn from 'classnames';

type Props = {
  sidebarContent: React.ReactNode,
  mainContent: React.ReactNode
};

const TwoColumns = (props: Props) => (
  <div className={styles.columns}>
    <aside className={cn(styles.sidebar,'p-2')}>
      {props.sidebarContent}
    </aside>

    <main className={cn(styles.main,'p-2')}>
      {props.mainContent}
    </main>

  </div>
);

export default TwoColumns;