import styles from './Header.module.scss';

import React from 'react';
import { Link } from 'react-router-dom';

const HeaderNav = () => (
  <header className={styles.header}>
    <Link className={styles.logo} to="/">
      <h5>CodeNote</h5>
    </Link>
  </header>
);

export default HeaderNav;