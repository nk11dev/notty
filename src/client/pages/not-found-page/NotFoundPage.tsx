import React from 'react';

import PageContent from '@/shared/ui/page/page-content';
import SingleAsideLayout from '@/shared/ui/layout/aside-layouts/single-aside-layout';

const NotFoundPage = () => (
  <SingleAsideLayout>
    <PageContent>
      <h1>404 Page Not Found</h1>
    </PageContent>
  </SingleAsideLayout>
);

export default NotFoundPage;