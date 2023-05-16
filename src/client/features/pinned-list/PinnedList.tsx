import React from 'react';

import SidebarList from '@/shared/ui/layout/sidebar-list';
import NavItem from '@/shared/ui/layout/nav-item';

const PinnedList = () => {
  const linksList = [
    { url: '/example', text: 'Example content' },
  ];

  return (
    <SidebarList>
      {linksList.map((item, index) => (
        <NavItem
          key={index}
          url={item.url}
        >
          {item.text}
        </NavItem>
      ))}
    </SidebarList>
  );
};

export default PinnedList;