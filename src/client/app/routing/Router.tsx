import React from 'react';
import { useRoutes } from 'react-router-dom';

import StartPage from '@/pages/start-page';
import ExamplePage from '@/pages/example-page';
import SectionPage from '@/pages/section-page';
import NotFoundPage from '@/pages/not-found-page';

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