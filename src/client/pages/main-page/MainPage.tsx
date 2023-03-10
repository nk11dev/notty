import React from 'react';
import { Outlet } from 'react-router-dom';

import LeftSidebar from '@/widgets/sidebar-content/left-sidebar';
import TwoColumns from '@/shared/ui/layout/two-columns';

const MainPage = () => (
  <TwoColumns
    sidebarContent={<LeftSidebar />}
    mainContent={<Outlet />}
  />
);

export default MainPage;