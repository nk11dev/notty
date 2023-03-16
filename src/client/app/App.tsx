import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import { store } from '@/app/redux/store';
import Router from '@/app/routing/Router';
import PageLayout from '@/shared/ui/layout/page-layout';


const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <PageLayout>
        <Router />
      </PageLayout>
    </BrowserRouter>
  </Provider>
);

export default App;