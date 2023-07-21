import React from 'react';

import UserFormHeader from '@/shared/ui/forms/user-form-header';
import UserLoginForm from '@/features/user-login-form';
import UserFormFooter from '@/shared/ui/forms/user-form-footer';

const LoginPage = () => (<>
  <UserFormHeader
    heading="Welcome to Notty"
    text="Sign in to have access!"
  />
  <UserLoginForm />
  <UserFormFooter
    text="Need an account?"
    linkText="Sign up"
    url="/registration"
  />
</>);

export default LoginPage;