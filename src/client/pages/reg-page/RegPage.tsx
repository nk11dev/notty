import React from 'react';

import UserRegForm from '@/features/user-reg-form';
import UserFormHeader from '@/shared/ui/forms/user-form-header';
import UserFormFooter from '@/shared/ui/forms/user-form-footer';

const RegPage = () => (<>
  <UserFormHeader
    heading="Welcome to Notty"
    text="Sign up to get started!"
  />
  <UserRegForm />
  <UserFormFooter
    text="Already have an account?"
    linkText="Sign in"
    url="/login"
  />
</>);

export default RegPage;