import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import Layout from '@/widgets/Layout';
import Router from '@/app/routing/Router';

const App = () => {
  console.log('App.tsx');

  return (
    <BrowserRouter>
      <Layout>
        <Router />
      </Layout>
    </BrowserRouter>
  );
};

export default App;