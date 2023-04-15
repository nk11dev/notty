import React from 'react';
import { NavLink } from 'react-router-dom';
import cn from 'classnames';

import SidebarList from '@/shared/ui/layout/sidebar-list';

const PinnedList = () => {

  const linksList = [
    { url: '/example', text: 'Example content' },
  ];

  return (
    <SidebarList>
      {linksList.map((item, index) => (
        <li key={index}>
          <NavLink
            to={item.url}
            className={({ isActive }) =>
              cn({ 'active': isActive })
            }
          >
            {item.text}
          </NavLink>
        </li>
      ))}
    </SidebarList>
  );
};

export default PinnedList;