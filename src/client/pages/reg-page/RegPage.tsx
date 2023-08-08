import React, { useEffect } from 'react';

import {
  useRegisterUserMutation,
  REGISTER_USER_CACHE_KEY,
} from '@/app/auth/slices';
import UserRegForm from '@/features/user-reg-form';
import UserRegSuccess from '@/features/user-reg-success';
import AuthMainContent from '@/shared/ui/forms/auth-main-content';
import UserFormHeader from '@/shared/ui/forms/user-form-header';
import UserFormFooter from '@/shared/ui/forms/user-form-footer';

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
      <AuthMainContent>
        <UserFormHeader>Sign up for Notty</UserFormHeader>
        <UserRegForm />
      </AuthMainContent>
      <UserFormFooter
        text="Already have an account?"
        linkText="Sign in"
        url="/login"
      />
    </>;
}

export default RegPage;