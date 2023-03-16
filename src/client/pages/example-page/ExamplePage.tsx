import React from 'react';

import LeftSidebar from '@/widgets/sidebar-content/left-sidebar';
import ExampleContent from '@/widgets/main-content/example-content';
import TwoColumns from '@/shared/ui/layout/two-columns';

const ExamplePage = () => (
  <TwoColumns
    sidebarContent={<LeftSidebar />}
    mainContent={<ExampleContent />}
  />
);

export default ExamplePage;