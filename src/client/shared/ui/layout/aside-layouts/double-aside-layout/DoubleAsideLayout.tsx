import React from 'react';
import { Outlet } from 'react-router-dom';

import AsideLeft from '@/widgets/sidebar-content/aside-left';
import AsideRight from '@/widgets/sidebar-content/aside-right';
import SidebarColumn from '@/shared/ui/layout/sidebar-column';
import BaseAsideLayout from '@/shared/ui/layout/aside-layouts/base-aside-layout';

type Props = {
  children?: React.ReactNode,
};

const DoubleAsideLayout = (props: Props) => (
  <BaseAsideLayout
    cls="double-column-layout"
    asideContent={
      <>
        <SidebarColumn>
          <AsideLeft />
        </SidebarColumn>

        <SidebarColumn>
          <AsideRight />
        </SidebarColumn>
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