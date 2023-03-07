import React from 'react';
import { useRoutes } from 'react-router-dom';

import StartPage from '@/pages/start';
import ExamplePage from '@/pages/example';
import FolderPage from '@/pages/folder';
import NotFoundPage from '@/pages/not-found';

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
    path: '/sections/:sectionId',
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