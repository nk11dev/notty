import React from 'react';
import { Outlet } from 'react-router-dom';

import AsideLeft from '@/widgets/sidebar-content/aside-left';
import SidebarAside from '@/shared/ui/layout/sidebar-aside';
import BaseAsideLayout from '@/shared/ui/layout/aside-layouts/base-aside-layout';

type Props = {
  children?: React.ReactNode,
};

const SingleAsideLayout = (props: Props) => (
  <BaseAsideLayout
    asideContent={
      <SidebarAside cls="sidebar-aside-1">
        <AsideLeft />
      </SidebarAside>
    }
  >
    {
      props.children
        ? props.children
        : <Outlet />
    }
  </BaseAsideLayout>
);

export default SingleAsideLayout;