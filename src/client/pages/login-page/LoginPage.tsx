import React from 'react';

import UserLoginForm from '@/features/user-login-form';
import AuthMain from '@/shared/ui/auth/auth-main';
import AuthTitle from '@/shared/ui/auth/auth-title';
import AuthFooter from '@/shared/ui/auth/auth-footer';

const LoginPage = () => (<>
  <AuthMain>
    <AuthTitle>Welcome to Notty</AuthTitle>
    <UserLoginForm />
  </AuthMain>
  <AuthFooter
    text="Need an account?"
    linkText="Sign up"
    url="/registration"
  />
</>);

export default LoginPage;