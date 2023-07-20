import React from 'react';

import AuthLayout from '@/shared/ui/layouts/auth-layout';
import UserFormHeader from '@/shared/ui/forms/user-form-header';
import UserRegForm from '@/features/user-reg-form';
import UserFormFooter from '@/shared/ui/forms/user-form-footer';

const UserRegPage = () => (
  <AuthLayout>
    <UserFormHeader text="Sign up to get started!" />

    <UserRegForm />
    
    <UserFormFooter
      text="Already have an account?"
      linkText="Sign in"
      url="/login"
    />
  </AuthLayout>
);

export default UserRegPage;