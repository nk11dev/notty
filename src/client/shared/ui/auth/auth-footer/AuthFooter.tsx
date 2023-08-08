import styles from './AuthFooter.module.scss';

import React from 'react';
import { Link } from 'react-router-dom';

type Props = {
  text: string,
  linkText: string,
  url: string,
};

const AuthFooter = (props: Props) => (
  <div className={styles.element}>
    <span className={styles.text}>
      {props.text}
    </span>
    <Link className={styles.link} to={props.url}>
      {props.linkText}
    </Link>
  </div>
);

export default AuthFooter;