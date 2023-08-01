import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

import { useUserState } from '@/entities/user/hooks';
import { useGetUserProfileQuery } from '@/entities/user/slices';
import ProgressBar from '@/shared/ui/fetching/progress-bar';

const PrivateRoute = () => {
  const { isUpdating, isAuthenticated } = useUserState();

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