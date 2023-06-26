import React from 'react';
import { useRoutes } from 'react-router-dom';

import HomePage from '@/pages/home-page';
import SectionPage from '@/pages/section-page';
import NotePage from '@/pages/note-page';
import NotFoundPage from '@/pages/not-found-page';

import RootLayout from '@/shared/ui/layouts/root-layout';

export const appRoutes = [
  {
    element: <RootLayout />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/sections/:folderSlug',
        element: <SectionPage />,
      },
      {
        path: '/sections/:folderSlug/notes/:noteId',
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