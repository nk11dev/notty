import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import { store } from '@/app/redux/store';
import Router from '@/app/routing/Router';
import RootLayout from '@/shared/ui/layout/root-layout';


const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <RootLayout>
        <Router />
      </RootLayout>
    </BrowserRouter>
  </Provider>
);

export default App;