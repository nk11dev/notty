import React from 'react';
import { useRoutes } from 'react-router-dom';

import HomePage from '@/pages/home-page';
import ExamplePage from '@/pages/example-page';
import SectionPage from '@/pages/section-page';
import NotePage from '@/pages/note-page';
import NotFoundPage from '@/pages/not-found-page';

import BaseAsideLayout from '@/shared/ui/layout/aside-layouts/base-aside-layout';

export const appRoutes = [
  {
    element: <BaseAsideLayout />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/example',
        element: <ExamplePage />,
      },
      {
        path: '/sections/:sectionId',
        element: <SectionPage />,
      },
      {
        path: '/sections/:sectionId/notes/:noteId',
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