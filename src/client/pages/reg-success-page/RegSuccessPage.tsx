import styles from './RegSuccessPage.module.scss';

import React from 'react';
import { useNavigate } from 'react-router-dom';
import cn from 'classnames';
import Alert from 'react-bootstrap/Alert';
import { IoCheckmarkCircle } from 'react-icons/io5';

import UserFormHeader from '@/shared/ui/forms/user-form-header';
import UserFormButton from '@/shared/ui/forms/user-form-button';

const RegSuccessPage = () => {
  const navigate = useNavigate();

  return (<>
    <UserFormHeader heading="Success!" />
    <Alert
      variant="light"
      className={cn(styles.element, "text-center my-4")}
    >
      <IoCheckmarkCircle className={styles.icon} />
      <div className={cn(styles.text, 'ms-1')}>
        Account created!
      </div>
      <UserFormButton
        type="button"
        text="Continue"
        clickHandler={() => navigate('/login')}
      />
    </Alert>
  </>);
}

export default RegSuccessPage;