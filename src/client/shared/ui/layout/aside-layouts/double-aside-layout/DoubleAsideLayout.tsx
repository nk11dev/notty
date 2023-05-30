import React from 'react';
import { Outlet } from 'react-router-dom';

import AsideLeft from '@/widgets/sidebar-content/aside-left';
import AsideRight from '@/widgets/sidebar-content/aside-right';
import SidebarAside from '@/shared/ui/layout/sidebar-aside';
import BaseAsideLayout from '@/shared/ui/layout/aside-layouts/base-aside-layout';

type Props = {
  children?: React.ReactNode,
};

const DoubleAsideLayout = (props: Props) => (
  <BaseAsideLayout
    asideContent={
      <>
        <SidebarAside cls="sidebar-aside-1">
          <AsideLeft />
        </SidebarAside>

        <SidebarAside cls="sidebar-aside-2">
          <AsideRight />
        </SidebarAside>
      </>
    }
  >
    {
      props.children
        ? props.children
        : <Outlet />
    }
  </BaseAsideLayout>
);

export default DoubleAsideLayout;