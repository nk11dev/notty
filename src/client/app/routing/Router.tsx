import React from 'react';
import { useRoutes } from 'react-router-dom';

import PrivateRoute from '@/app/auth/private-route';
import RegPage from '@/pages/reg-page';
import RegSuccessPage from '@/pages/reg-success-page';
import LoginPage from '@/pages/login-page';
import HomePage from '@/pages/home-page';
import FolderPage from '@/pages/folder-page';
import NotePage from '@/pages/note-page';
import NotFoundPage from '@/pages/not-found-page';
import AuthLayout from '@/shared/ui/layouts/auth-layout';
import RootLayout from '@/shared/ui/layouts/root-layout';

export const appRoutes = [
  {
    element: <AuthLayout />,
    children: [
      {
        path: '/registration',
        element: <RegPage />,
      },
      {
        path: '/registration-success',
        element: <RegSuccessPage />,
      },
      {
        path: '/login',
        element: <LoginPage />,
      },
    ]
  },
  {
    element: <PrivateRoute />,
    children: [
      {
        element: <RootLayout />,
        children: [
          {
            path: '/',
            element: <HomePage />,
          },
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