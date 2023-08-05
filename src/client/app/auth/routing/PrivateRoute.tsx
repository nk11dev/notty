import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

import { useAuth } from '@/app/auth/hooks';
import { useGetUserProfileQuery } from '@/app/auth/slices';
import ProgressBar from '@/shared/ui/fetching/progress-bar';

const PrivateRoute = () => {
  const { isUpdating, isAuthenticated } = useAuth();

  const {
    isFetching,
  } = useGetUserProfileQuery(undefined, {
    skip: isUpdating || isAuthenticated || !Cookies.get('has-access-token'),
    refetchOnMountOrArgChange: true,
  });

  if (isFetching || isUpdating) return <ProgressBar />;

  return isAuthenticated
    ? <Outlet />
    : <Navigate to='/login' replace />;
};

export default PrivateRoute;