import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import Layout from '@/widgets/layout';
import Router from '@/app/routing/Router';

const App = () => (
  <BrowserRouter>
    <Layout>
      <Router />
    </Layout>
  </BrowserRouter>
);

export default App;