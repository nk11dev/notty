import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import cn from 'classnames';

import SidebarList from '@/shared/ui/layout/sidebar-list';

const PinnedList = () => {
  const { search: queryParams } = useLocation();

  const linksList = [
    { url: '/example', text: 'Example content' },
  ];

  return (
    <SidebarList>
      {linksList.map((item, index) => (
        <li key={index}>
          <NavLink
            to={item.url + queryParams}
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