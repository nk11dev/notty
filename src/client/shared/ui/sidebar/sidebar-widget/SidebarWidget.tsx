import styles from './SidebarWidget.module.scss';

import React from 'react';
import cn from 'classnames';

type Props = {
  children: React.ReactNode
  isScrollable?: boolean
};

const SidebarWidget = (props: Props) => {
  const { isScrollable = false } = props;
  return (
    <div className={cn(styles.element, {
      [styles.isScrollable as string]: isScrollable,
      [styles.isNotScrollable as string]: !isScrollable,
    })}>
      {props.children}
    </div>
  );
}

export default SidebarWidget;