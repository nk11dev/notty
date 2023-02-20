import './HeaderNav.scss';

import React from 'react';
import { NavLink } from 'react-router-dom';

const HeaderNav = () => {

  const navList = [
    { url: '/', text: 'To start page' },
    { url: '/example', text: 'To example page' },
  ];

  return (
    <nav className="header-nav">
      {navList.map((item, index) => (
        <NavLink
          key={index}
          to={item.url}
        >
          {item.text}
        </NavLink>
      ))}
    </nav>
  );
};

export default HeaderNav;