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
} from '@/entities/user/slices';
import type { BaseQueryError } from '@/shared/types';
import UserFormField from '@/shared/ui/forms/user-form-field';
import UserFormButton from '@/shared/ui/forms/user-form-button';
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
        <Form.Group className="mb-3">
          <UserFormField
            type="text"
            name="username"
            placeholder="Name"
            icon={<IoPersonOutline />}
          />
          <UserFormField
            type="text"
            name="email"
            placeholder="E-mail"
            icon={<IoMailOutline />}
          />
          <UserFormField
            type="password"
            name="password"
            placeholder="Password"
            icon={<IoLockClosedOutline />}
          />
          <UserFormField
            type="password"
            name="passwordConfirm"
            placeholder="Confirm password"
            icon={<IoLockClosedOutline />}
          />
          <UserFormButton
            type="submit"
            text="Complete sign up"
            isDisabled={isLoading}
          />
        </Form.Group>
      </Form>
    </FormProvider>
  </>);
}

export default UserRegForm;