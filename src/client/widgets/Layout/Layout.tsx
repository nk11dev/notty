import React from 'react';
import { NavLink } from 'react-router-dom';

type Props = {
  children: React.ReactNode
};

const Layout = (props: Props) => {

  const navList = [
    { url: '/', text: 'To start page' },
    { url: '/example', text: 'To example page' },
  ];

  return (
    <>
      <nav>
        {navList.map((item, index) => (
          <div key={index}>
            <NavLink to={item.url}>
              {item.text}
            </NavLink>
          </div>
        ))}
      </nav>

      <main>
        {props.children}
      </main>
    </>
  );
};

export default Layout;