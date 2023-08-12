import styles from './PageContent.module.scss';

import React from 'react';

import Scrollbar from '@/shared/ui/controls/scrollbar';

type Props = {
  children: React.ReactNode,
  isFlex?: boolean
};

const PageContent = (props: Props) => (
  <Scrollbar>
    <div className={styles.element}>
      {props.children}
    </div>
  </Scrollbar>
);

export default PageContent;