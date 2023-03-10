import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import PageLayout from '@/shared/ui/layout/page-layout';
import Router from '@/app/routing/Router';

const App = () => (
  <BrowserRouter>
    <PageLayout>
      <Router />
    </PageLayout>
  </BrowserRouter>
);

export default App;