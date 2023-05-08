import styles from './SidebarAside.module.scss';

import React from 'react';
import cn from 'classnames';

type Props = {
  children?: React.ReactNode,
  cls?: string,
};

const SidebarAside = (props: Props) => {
  const { cls } = props;

  return (
    <aside className={cn(styles.sidebarAside, cls)}>
      {props.children}
    </aside>
  )
};

export default SidebarAside;