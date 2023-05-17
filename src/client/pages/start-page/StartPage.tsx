import React from 'react';
import { Outlet } from 'react-router-dom';

import AsideLeft from '@/widgets/sidebar-content/aside-left';
import SidebarAside from '@/shared/ui/layout/sidebar-aside';
import TwoColumns from '@/shared/ui/layout/two-columns';

const StartPage = () => (
  <TwoColumns
    sidebarContent={
      <SidebarAside cls="sidebar-aside-1">
        <AsideLeft />
      </SidebarAside>
    }
    mainContent={<Outlet />}
  />
);

export default StartPage;