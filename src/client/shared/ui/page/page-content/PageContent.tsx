import styles from './PageContent.module.scss';

import React from 'react';
import cn from 'classnames';

type Props = {
  children: React.ReactNode,
  isFlex?: boolean
};

const PageContent = (props: Props) => (
  <div className={cn(styles.element, {
    [styles.isFlex as string]: (props.isFlex === true)
  })}>
    {props.children}
  </div>
);

export default PageContent;