import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Form from 'react-bootstrap/Form';

import { userRegisterPayloadSchema } from '@/common/schemas';
import type { UserRegisterPayload } from '@/common/types/user.types';

import { useRegisterUserMutation } from '@/entities/user/slices';
import type { BaseQueryError } from '@/shared/types';
import UserFormField from '@/shared/ui/forms/user-form-field';
import UserFormButton from '@/shared/ui/forms/user-form-button';
import ProgressBar from '@/shared/ui/fetching/progress-bar';

const UserRegForm = () => {
  const navigate = useNavigate();

  const [registerUser, {
    isSuccess,
    isError,
    isLoading,
    error: registrationError,
  }] = useRegisterUserMutation();

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
    if (isSuccess) {
      navigate('/registration-success');

    } else if (isError) {
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
  }, [isSuccess, isError, registrationError, navigate, setError]);

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
            label="Name"
            placeholder="Your Name"
          />
          <UserFormField
            type="text"
            name="email"
            label="Email"
            placeholder="your@email.com"
          />
          <UserFormField
            type="password"
            name="password"
            label="Password"
            placeholder="your password (at least 6 characters)"
          />
          <UserFormField
            type="password"
            name="passwordConfirm"
            label="Confirm password"
            placeholder="your password (at least 6 characters)"
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