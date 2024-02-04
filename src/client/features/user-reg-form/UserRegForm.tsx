import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Form from 'react-bootstrap/Form';
import { IoPersonOutline, IoMailOutline, IoLockClosedOutline } from 'react-icons/io5';

import { userRegisterPayloadSchema } from '@/common/schemas';
import type { UserRegisterPayload } from '@/common/types/user.types';

import {
  useRegisterUserMutation,
  REGISTER_USER_CACHE_KEY,
} from '@/app/auth/slices';
import type { BaseQueryError } from '@/shared/types';
import AuthFormField from '@/shared/ui/auth/auth-form-field';
import AuthButton from '@/shared/ui/auth/auth-button';
import ProgressBar from '@/shared/ui/fetching/progress-bar';

const UserRegForm = () => {
  const navigate = useNavigate();

  const [registerUser, regState] = useRegisterUserMutation({
    fixedCacheKey: REGISTER_USER_CACHE_KEY,
  });

  const {
    isLoading,
    isError,
    error: registrationError,
  } = regState;

  const methods = useForm<UserRegisterPayload>({
    resolver: zodResolver(userRegisterPayloadSchema),
    mode: 'onTouched',
    defaultValues: {
      username: '',
      email: '',
      password: '',
      passwordConfirm: '',
    },
  });

  const { handleSubmit, setError } = methods;

  useEffect(() => {
    if (isError) {
      const error = (registrationError as BaseQueryError)?.data as BaseQueryError;
      const { data: errors } = error || {};

      if (Array.isArray(errors) && errors.length > 0) {
        errors.forEach(item => setError(
          item.path, {
          type: 'server',
          message: item.message,
        }));
      }
    }
  }, [isError, registrationError, navigate, setError]);

  const onSubmit = (data: UserRegisterPayload) => {
    registerUser(data);
  }

  return (<>
    {isLoading && <ProgressBar />}
    <FormProvider {...methods}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <AuthFormField
          type="text"
          name="username"
          placeholder="Name"
          icon={<IoPersonOutline />}
        />
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
        <AuthFormField
          type="password"
          name="passwordConfirm"
          placeholder="Confirm password"
          icon={<IoLockClosedOutline />}
        />
        <AuthButton
          type="submit"
          text="Register now"
          isDisabled={isLoading}
        />
      </Form>
    </FormProvider>
  </>);
}

export default UserRegForm;