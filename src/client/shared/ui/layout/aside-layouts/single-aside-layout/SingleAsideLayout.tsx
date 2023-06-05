import React from 'react';
import { Outlet } from 'react-router-dom';

import SidebarColumn from '@/shared/ui/layout/sidebar-column';
import BaseAsideLayout from '@/shared/ui/layout/aside-layouts/base-aside-layout';
import {
  SidebarPinnedWidget,
  SidebarSectionsWidget,
} from '@/widgets/sidebar-widgets';

type Props = {
  children?: React.ReactNode,
};

const AsideContent = (
  <SidebarColumn>
    <SidebarPinnedWidget />
    <SidebarSectionsWidget />
  </SidebarColumn>
);

const SingleAsideLayout = (props: Props) => (
  <BaseAsideLayout
    cls="single-column-layout"
    asideContent={AsideContent}
  >
    {
      props.children
        ? props.children
        : <Outlet />
    }
  </BaseAsideLayout>
);

export default SingleAsideLayout;