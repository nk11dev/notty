import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Form from 'react-bootstrap/Form';

import { userLoginPayloadSchema } from '@/common/schemas';
import type { UserLoginPayload } from '@/common/types/user.types';

import { useLoginUserMutation } from '@/entities/user/slices';
import { useUserState } from '@/entities/user/hooks';
import type { BaseQueryError } from '@/shared/types';
import UserFormField from '@/shared/ui/forms/user-form-field';
import UserFormButton from '@/shared/ui/forms/user-form-button';

const UserLoginForm = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useUserState();
  const [loginUser, result] = useLoginUserMutation();

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
    if (result.isSuccess) {
      isAuthenticated && navigate('/');

    } else {
      const error = (result.error as BaseQueryError)?.data as BaseQueryError;
      const { data: errors } = error || {};

      if (Array.isArray(errors) && errors.length > 0) {
        errors.forEach(item => setError(
          item.path, {
          type: 'server',
          message: item.message,
        }));
      }

    }
  }, [result, isAuthenticated, navigate, setError]);

  const onSubmit = (data: UserLoginPayload) => {
    loginUser(data)
  }

  return (
    <FormProvider {...methods}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3">
          <UserFormField
            label="Email"
            placeholder="your@email.com"
            name="email"
            type="text"
          />
          <UserFormField
            label="Password"
            placeholder="your password"
            name="password"
            type="password"
          />
          <UserFormButton text="SIGN IN" />
        </Form.Group>
      </Form>
    </FormProvider>
  );
}

export default UserLoginForm;