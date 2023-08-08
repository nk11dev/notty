import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Form from 'react-bootstrap/Form';
import { IoMailOutline, IoLockClosedOutline } from 'react-icons/io5';

import { userLoginPayloadSchema } from '@/common/schemas';
import type { UserLoginPayload } from '@/common/types/user.types';

import { useAuth } from '@/app/auth/hooks';
import { useLoginUserMutation } from '@/app/auth/slices';
import type { BaseQueryError } from '@/shared/types';
import AuthFormField from '@/shared/ui/auth/auth-form-field';
import AuthButton from '@/shared/ui/auth/auth-button';
import ProgressBar from '@/shared/ui/fetching/progress-bar';

const UserLoginForm = () => {
  const navigate = useNavigate();
  const { isUpdating, isAuthenticated } = useAuth();

  const [loginUser, {
    isSuccess,
    isError,
    isLoading,
    error: loginError,
  }] = useLoginUserMutation();

  const methods = useForm<UserLoginPayload>({
    resolver: zodResolver(userLoginPayloadSchema),
    mode: 'onTouched',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { handleSubmit, setError } = methods;

  useEffect(() => {
    if (isSuccess) {
      isAuthenticated && navigate('/');

    } else if (isError) {
      const error = (loginError as BaseQueryError)?.data as BaseQueryError;
      const { data: errors } = error || {};

      if (Array.isArray(errors) && errors.length > 0) {
        errors.forEach(item => setError(
          item.path, {
          type: 'server',
          message: item.message,
        }));
      }

    }
  }, [isSuccess, isError, loginError, isAuthenticated, navigate, setError]);

  const onSubmit = (data: UserLoginPayload) => {
    loginUser(data)
  }

  return (<>
    {(isLoading || isUpdating) && <ProgressBar />}
    <FormProvider {...methods}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <AuthFormField
          type="text"
          name="email"
          placeholder="E-mail"
          icon={<IoMailOutline />}
        />
        <AuthFormField
          type="password"
          name="password"
          placeholder="Password"
          icon={<IoLockClosedOutline />}
        />
        <AuthButton
          type="submit"
          text="Sign in"
          isDisabled={isLoading}
        />
      </Form>
    </FormProvider>
  </>);
}

export default UserLoginForm;