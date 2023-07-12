import React from 'react';

import AuthLayout from '@/shared/ui/layouts/auth-layout';
import UserFormHeader from '@/shared/ui/forms/user-form-header';
import UserLoginForm from '@/features/user-login-form';
import UserFormFooter from '@/shared/ui/forms/user-form-footer';

const UserLoginPage = () => (
  <AuthLayout>
    <UserFormHeader text="Sign in for Notty" />

    <UserLoginForm />
    
    <UserFormFooter
      text="Need an account?"
      linkText="Sign up"
      url="/registration"
    />
  </AuthLayout>
);

export default UserLoginPage;