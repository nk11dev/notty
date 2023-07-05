import styles from './UserRegPage.module.scss';

import React from 'react';

import UserFormHeader from '@/shared/ui/forms/user-form-header';
import UserRegForm from '@/features/user-reg-form';
import UserFormFooter from '@/shared/ui/forms/user-form-footer';

const UserRegPage = () => (
  <div className={styles.wrapper}>
    <UserFormHeader text="Sign up for Notty" />

    <UserRegForm />

    <UserFormFooter
      text="Already have an account?"
      linkText="Sign in"
      url="/login"
    />
  </div>
);

export default UserRegPage;