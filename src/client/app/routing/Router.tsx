import React from 'react';
import { useRoutes } from 'react-router-dom';

import NotFoundPage from '@/pages/not-found-page';

import ExampleContent from '@/widgets/main-content/example-content';
import NoteContent from '@/widgets/main-content/note-content';

import SingleAsideLayout from '@/shared/ui/layout/aside-layouts/single-aside-layout';
import DoubleAsideLayout from '@/shared/ui/layout/aside-layouts/double-aside-layout';

export const appRoutes = [
  {
    path: '/',
    element: <SingleAsideLayout />,
    children: [
      {
        path: '/example',
        element: <ExampleContent />,
      },
    ]
  },
  {
    path: '/sections/:sectionId',
    element: <DoubleAsideLayout />,
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