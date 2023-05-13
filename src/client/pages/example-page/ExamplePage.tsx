import React from 'react';

import AsideLeft from '@/widgets/sidebar-content/aside-left';
import ExampleContent from '@/widgets/main-content/example-content';
import SidebarAside from '@/shared/ui/layout/sidebar-aside';
import TwoColumns from '@/shared/ui/layout/two-columns';

const ExamplePage = () => (
  <TwoColumns
    sidebarContent={
      <SidebarAside cls="sidebar-aside-1">
        <AsideLeft />
      </SidebarAside>
    }
    mainContent={<ExampleContent />}
  />
);

export default ExamplePage;