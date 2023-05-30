import React from 'react';

import SidebarList from '@/shared/ui/layout/sidebar-list';
import NavItem from '@/shared/ui/layout/nav-item';

const PinnedList = () => {
  const linksList = [
    { url: '/', text: 'Home' },
    { url: '/example', text: 'Example content' },
  ];

  return (
    <SidebarList>
      {linksList.map((item, index) => (
        <NavItem
          key={index}
          url={item.url}
          searchParamsOptions={{
            hideSidebarNav: true
          }}
        >
          {item.text}
        </NavItem>
      ))}
    </SidebarList>
  );
};

export default PinnedList;