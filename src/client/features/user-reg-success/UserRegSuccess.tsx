import styles from './UserRegSuccess.module.scss';

import React from 'react';
import { useNavigate } from 'react-router-dom';
import cn from 'classnames';
import Alert from 'react-bootstrap/Alert';
import { IoCheckmarkCircle } from 'react-icons/io5';

import {
  useRegisterUserMutation,
  REGISTER_USER_CACHE_KEY,
} from '@/app/auth/slices';
import type { UserDto } from '@/app/auth/types';
import UserFormHeader from '@/shared/ui/forms/user-form-header';
import UserFormButton from '@/shared/ui/forms/user-form-button';

const UserRegSuccess = () => {
  const navigate = useNavigate();
  const [, regState] = useRegisterUserMutation({
    fixedCacheKey: REGISTER_USER_CACHE_KEY,
  });

  const { email } = regState.data as UserDto;

  return (<>
    <UserFormHeader heading="Success!" />
    <Alert
      variant="light"
      className={cn(styles.element, "text-center my-4")}
    >
      <IoCheckmarkCircle className={styles.icon} />
      <div className={cn(styles.text, 'ms-1')}>
        Account for email <b>{email}</b> is created!
      </div>
      <UserFormButton
        type="button"
        text="Continue"
        clickHandler={() => navigate('/login')}
      />
    </Alert>
  </>);
}

export default UserRegSuccess;