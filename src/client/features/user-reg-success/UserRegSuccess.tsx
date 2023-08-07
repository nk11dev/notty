import styles from './UserRegSuccess.module.scss';

import React from 'react';
import { useNavigate } from 'react-router-dom';
import cn from 'classnames';
import { IoCheckmarkCircle } from 'react-icons/io5';

import {
  useRegisterUserMutation,
  REGISTER_USER_CACHE_KEY,
} from '@/app/auth/slices';
import type { UserDto } from '@/app/auth/types';
import AuthMainContent from '@/shared/ui/forms/auth-main-content';
import UserFormHeader from '@/shared/ui/forms/user-form-header';
import UserFormButton from '@/shared/ui/forms/user-form-button';

const UserRegSuccess = () => {
  const navigate = useNavigate();
  const [, regState] = useRegisterUserMutation({
    fixedCacheKey: REGISTER_USER_CACHE_KEY,
  });

  const { email } = regState.data as UserDto || {};

  return (
    <AuthMainContent>
      <UserFormHeader heading="Success!" />
      <IoCheckmarkCircle className={styles.icon} />
      <div className={cn(styles.text, 'ms-1')}>
        Your account for email <b>{email}</b> has been created. Sign in to start using app.
      </div>
      <UserFormButton
        type="button"
        text="Continue"
        clickHandler={() => navigate('/login')}
      />
    </AuthMainContent>
  );
}

export default UserRegSuccess;