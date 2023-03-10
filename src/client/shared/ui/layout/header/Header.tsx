import './Header.scss';

import React from 'react';
import { Link } from 'react-router-dom';

const HeaderNav = () => (
  <header className="header">
    <Link className="logo" to="/">
      <h5>CodeNote</h5>
    </Link>
  </header>
);

export default HeaderNav;