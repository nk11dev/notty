import React from 'react';

import PageContent from '@/shared/ui/page/page-content';
import BaseAsideLayout from '@/shared/ui/layout/aside-layouts/base-aside-layout';

const NotFoundPage = () => (
  <BaseAsideLayout>
    <PageContent>
      <h1>404 Page Not Found</h1>
    </PageContent>
  </BaseAsideLayout>
);

export default NotFoundPage;