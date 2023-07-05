import styles from './UserLoginPage.module.scss';

import React from 'react';

import UserFormHeader from '@/shared/ui/forms/user-form-header';
import UserLoginForm from '@/features/user-login-form';
import UserFormFooter from '@/shared/ui/forms/user-form-footer';

const UserLoginPage = () => (
  <div className={styles.wrapper}>
    <UserFormHeader text="Sign in for Notty" />

    <UserLoginForm />

    <UserFormFooter
      text="Need an account?"
      linkText="Sign up"
      url="/registration"
    />
  </div>
);

export default UserLoginPage;