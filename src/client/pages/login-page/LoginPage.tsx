import React from 'react';

import UserLoginForm from '@/features/user-login-form';
import AuthMainContent from '@/shared/ui/forms/auth-main-content';
import UserFormHeader from '@/shared/ui/forms/user-form-header';
import UserFormFooter from '@/shared/ui/forms/user-form-footer';

const LoginPage = () => (<>
  <AuthMainContent>
    <UserFormHeader>Sign in to Notty</UserFormHeader>
    <UserLoginForm />
  </AuthMainContent>
  <UserFormFooter
    text="Need an account?"
    linkText="Sign up"
    url="/registration"
  />
</>);

export default LoginPage;