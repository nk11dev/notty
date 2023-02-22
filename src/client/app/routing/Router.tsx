import React from 'react';
import { useRoutes } from 'react-router-dom';

import StartPage from '@/pages/StartPage';
import ExamplePage from '@/pages/ExamplePage';
import FolderPage from '@/pages/FolderPage';
import NotFoundPage from '@/pages/NotFoundPage';

export const appRoutes = [
  {
    path: '/',
    element: <StartPage />,
  },
  {
    path: '/example',
    element: <ExamplePage />,
  },
  {
    path: '/folders/:folderId',
    element: <FolderPage />,
  },
];

const Router = () => useRoutes([
  ...appRoutes,
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);

export default Router;