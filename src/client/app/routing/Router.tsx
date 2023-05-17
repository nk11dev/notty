import React from 'react';
import { useRoutes } from 'react-router-dom';

import StartPage from '@/pages/start-page';
import MainPage from '@/pages/main-page';
import NotFoundPage from '@/pages/not-found-page';

import ExampleContent from '@/widgets/main-content/example-content';
import NoteContent from '@/widgets/main-content/note-content';

export const appRoutes = [
  {
    path: '/',
    element: <StartPage />,
    children: [
      {
        path: '/example',
        element: <ExampleContent />,
      },
    ]
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
];

const Router = () => useRoutes([
  ...appRoutes,
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);

export default Router;