import React from 'react';
import { useRoutes } from 'react-router-dom';

import StartPage from '@/pages/start';
import ExamplePage from '@/pages/example';
import SectionPage from '@/pages/section';
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
    element: <SectionPage />,
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