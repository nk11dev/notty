import React from 'react';
import { Link } from 'react-router-dom';

import SidebarList from '@/shared/ui/layout/sidebar-list';

const PinnedList = () => {

  const linksList = [
    { url: '/example', text: 'Example content' },
  ];

  return (
    <SidebarList>
      {linksList.map((item, index) => (
        <li key={index}>
          <Link
            to={item.url}
          >
            {item.text}
          </Link>
        </li>
      ))}
    </SidebarList>
  );
};

export default PinnedList;