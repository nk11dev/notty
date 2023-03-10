import React from 'react';
import { useRoutes } from 'react-router-dom';

import MainPage from '@/pages/main-page';
import ExamplePage from '@/pages/example-page';
import NotFoundPage from '@/pages/not-found-page';
import SectionContent from '@/widgets/main-content/section-content';

export const appRoutes = [
  {
    path: '/',
    element: <MainPage />,
  },
  {
    path: '/sections',
    element: <MainPage />,
    children: [
      {
        path: ':sectionId',
        element: <SectionContent />,
      },
    ]
  },
  {
    path: '/example',
    element: <ExamplePage />,
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