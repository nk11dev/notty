import React from 'react';
import { useRoutes } from 'react-router-dom';

import MainPage from '@/pages/main-page';
import ExamplePage from '@/pages/example-page';
import NotFoundPage from '@/pages/not-found-page';
import NoteContent from '@/widgets/main-content/note-content';

export const appRoutes = [
  {
    path: '/',
    element: <MainPage />,
  },
  {
    path: '/sections/:sectionId',
    element: <MainPage />,
    children: [
      {
        path: 'notes/:noteId',
        element: <NoteContent />,
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