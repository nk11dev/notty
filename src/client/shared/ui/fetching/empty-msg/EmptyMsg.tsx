import styles from './EmptyMsg.module.scss';

import React from 'react';

type Props = {
  children?: React.ReactNode,
};

const EmptyMsg = (props: Props) => (
  <div className={styles.element}>
    <div>It&rsquo;s empty here.</div>

    {props.children
      ? props.children
      : null}
  </div>
);

export default EmptyMsg;