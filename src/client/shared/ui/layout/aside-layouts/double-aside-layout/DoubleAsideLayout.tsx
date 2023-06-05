import React from 'react';
import { Outlet } from 'react-router-dom';

import SidebarColumn from '@/shared/ui/layout/sidebar-column';
import BaseAsideLayout from '@/shared/ui/layout/aside-layouts/base-aside-layout';
import {
  SidebarPinnedWidget,
  SidebarSectionsWidget,
  SidebarNotesWidget,
} from '@/widgets/sidebar-widgets';

type Props = {
  children?: React.ReactNode,
};

const AsideContent = (
  <>
    <SidebarColumn>
      <SidebarPinnedWidget />
      <SidebarSectionsWidget />
    </SidebarColumn>

    <SidebarColumn>
      <SidebarNotesWidget />
    </SidebarColumn>
  </>
);

const DoubleAsideLayout = (props: Props) => (
  <BaseAsideLayout
    cls="double-column-layout"
    asideContent={AsideContent}
  >
    {
      props.children
        ? props.children
        : <Outlet />
    }
  </BaseAsideLayout>
);

export default DoubleAsideLayout;