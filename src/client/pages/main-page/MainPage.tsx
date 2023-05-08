import React from 'react';
import { Outlet } from 'react-router-dom';

import LeftSidebar from '@/widgets/sidebar-content/left-sidebar';
import TwoColumns from '@/shared/ui/layout/two-columns';
import SidebarAside from '@/shared/ui/layout/sidebar-aside';

const MainPage = () => (
  <TwoColumns
    sidebarContent={
      <>
        <SidebarAside cls="sidebar-aside-1">
          <LeftSidebar />
        </SidebarAside>

        <SidebarAside cls="sidebar-aside-2" />
      </>
    }
    mainContent={<Outlet />}
  />
);

export default MainPage;