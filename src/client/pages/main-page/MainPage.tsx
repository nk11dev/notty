import React from 'react';
import { Outlet } from 'react-router-dom';

import AsideLeft from '@/widgets/sidebar-content/aside-left';
import AsideRight from '@/widgets/sidebar-content/aside-right';
import SidebarAside from '@/shared/ui/layout/sidebar-aside';
import TwoColumns from '@/shared/ui/layout/two-columns';

const MainPage = () => (
  <TwoColumns
    sidebarContent={
      <>
        <SidebarAside cls="sidebar-aside-1">
          <AsideLeft />
        </SidebarAside>

        <SidebarAside cls="sidebar-aside-2">
          <AsideRight />
        </SidebarAside>
        
      </>
    }
    mainContent={<Outlet />}
  />
);

export default MainPage;