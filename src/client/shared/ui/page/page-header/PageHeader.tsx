import styles from './PageHeader.module.scss';

import React from 'react';
import cn from 'classnames';

type Props = {
  showBoxShadow?: boolean,
  children: React.ReactNode,
};

const PageHeader = ({ showBoxShadow = true, children }: Props) => (
  <div className={cn(styles.element, {
    [styles.showBoxShadow as string]: showBoxShadow
  })}>
    {children}
  </div>
);

export default PageHeader;