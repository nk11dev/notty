import React from 'react';
import { useRoutes } from 'react-router-dom';

import ExamplePage from '@/pages/example-page';
import NotePage from '@/pages/note-page';
import NotFoundPage from '@/pages/not-found-page';

import SingleAsideLayout from '@/shared/ui/layout/aside-layouts/single-aside-layout';
import DoubleAsideLayout from '@/shared/ui/layout/aside-layouts/double-aside-layout';

export const appRoutes = [
  {
    path: '/',
    element: <SingleAsideLayout />,
    children: [
      {
        path: '/example',
        element: <ExamplePage />,
      },
    ]
  },
  {
    path: '/sections/:sectionId',
    element: <DoubleAsideLayout />,
    children: [
      {
        path: 'notes/:noteId',
        element: <NotePage />,
      },
    ]
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