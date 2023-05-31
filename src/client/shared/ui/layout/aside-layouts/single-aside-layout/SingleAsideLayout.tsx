import React from 'react';
import { Outlet } from 'react-router-dom';

import AsideLeft from '@/widgets/sidebar-content/aside-left';
import SidebarColumn from '@/shared/ui/layout/sidebar-column';
import BaseAsideLayout from '@/shared/ui/layout/aside-layouts/base-aside-layout';

type Props = {
  children?: React.ReactNode,
};

const SingleAsideLayout = (props: Props) => (
  <BaseAsideLayout
    cls="single-column-layout"
    asideContent={
      <SidebarColumn>
        <AsideLeft />
      </SidebarColumn>
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