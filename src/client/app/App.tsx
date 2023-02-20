import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';

import ExamplePage from '@/pages/ExamplePage';
import StartPage from '@/pages/StartPage';
import FolderPage from '@/pages/FolderPage';
import NotFoundPage from '@/pages/NotFoundPage';

import Layout from '@/widgets/Layout';

const App = () => {
  console.log('App.tsx');

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<StartPage />} />
          <Route path="/example" element={<ExamplePage />} />
          <Route path="/folders/:folderId" element={<FolderPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default App;