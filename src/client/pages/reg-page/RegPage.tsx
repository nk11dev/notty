import React, { useEffect } from 'react';

import {
  useRegisterUserMutation,
  REGISTER_USER_CACHE_KEY,
} from '@/app/auth/slices';
import UserRegForm from '@/features/user-reg-form';
import UserRegSuccess from '@/features/user-reg-success';
import AuthMain from '@/shared/ui/auth/auth-main';
import AuthTitle from '@/shared/ui/auth/auth-title';
import AuthFooter from '@/shared/ui/auth/auth-footer';

const RegPage = () => {
  const [, {
    isSuccess,
    reset,
  }] = useRegisterUserMutation({
    fixedCacheKey: REGISTER_USER_CACHE_KEY,
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => () => reset(), []);

  return isSuccess
    ? <UserRegSuccess />
    : <>
      <AuthMain>
        <AuthTitle>Sign up for Notty</AuthTitle>
        <UserRegForm />
      </AuthMain>
      <AuthFooter
        text="Already have an account?"
        linkText="Sign in"
        url="/login"
      />
    </>;
}

export default RegPage;