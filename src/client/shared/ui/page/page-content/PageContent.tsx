import styles from './PageContent.module.scss';

import React from 'react';
import cn from 'classnames';

import Scrollbar from '@/shared/ui/controls/scrollbar';

type Props = {
  children: React.ReactNode,
  isFlex?: boolean
};

const PageContent = (props: Props) => (
  <Scrollbar>
    <div className={cn(styles.element, {
      [styles.isFlex as string]: (props.isFlex === true)
    })}>
      {props.children}
    </div>
  </Scrollbar>
);

export default PageContent;