import React from 'react';
import { Routes, Route } from 'react-router-dom';

import PrivateRoute from '@/app/auth/routing';
import RegPage from '@/pages/reg-page';
import LoginPage from '@/pages/login-page';
import HomePage from '@/pages/home-page';
import FolderPage from '@/pages/folder-page';
import NotePage from '@/pages/note-page';
import NotFoundPage from '@/pages/not-found-page';
import AuthLayout from '@/shared/ui/layouts/auth-layout';
import RootLayout from '@/shared/ui/layouts/root-layout';

const Router = () => (
  <Routes>
    <Route element={<AuthLayout />} >
      <Route path="/login" element={<LoginPage />} />
      <Route path="/registration" element={<RegPage />} />
    </Route>

    <Route element={<PrivateRoute />} >
      <Route element={<RootLayout />} >
        <Route path="/" element={<HomePage />} />
        <Route path="/folders/:folderSlug" element={<FolderPage />} />
        <Route path="/folders/:folderSlug/notes/:noteSlug" element={<NotePage />} />
      </Route>
    </Route>

    <Route path="*" element={<NotFoundPage />} />
  </Routes>
);

export default Router;