import React from 'react';

import PageContent from '@/shared/ui/page/page-content';
import RootLayout from '@/shared/ui/layouts/root-layout';

const HomePage = () => (
  <RootLayout>
    <PageContent>
      <h1>Welcome to Notty</h1>
      Home of your notes
    </PageContent>
  </RootLayout>
);

export default HomePage;