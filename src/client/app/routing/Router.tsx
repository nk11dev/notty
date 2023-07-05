import React from 'react';
import { useRoutes } from 'react-router-dom';

import HomePage from '@/pages/home-page';
import UserRegPage from '@/pages/user-reg-page';
import UserLoginPage from '@/pages/user-login-page';
import FolderPage from '@/pages/folder-page';
import NotePage from '@/pages/note-page';
import NotFoundPage from '@/pages/not-found-page';

import RootLayout from '@/shared/ui/layouts/root-layout';

export const appRoutes = [
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/registration',
    element: <UserRegPage />,
  },
  {
    path: '/login',
    element: <UserLoginPage />,
  },
  {
    element: <RootLayout />,
    children: [
      {
        path: '/folders/:folderSlug',
        element: <FolderPage />,
      },
      {
        path: '/folders/:folderSlug/notes/:noteSlug',
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