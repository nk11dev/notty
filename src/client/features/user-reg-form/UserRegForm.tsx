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

const UserRegForm = () => {
  const navigate = useNavigate();
  const [registerUser, result] = useRegisterUserMutation();

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
    if (result.isSuccess) {
      navigate('/login');

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
  }, [result, navigate, setError]);

  const onSubmit = (data: UserRegisterPayload) => {
    registerUser(data);
  }

  return (
    <FormProvider {...methods}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3">
          <UserFormField
            label="Name"
            placeholder="Your Name"
            name="username"
            type="text"
          />
          <UserFormField
            label="Email"
            placeholder="your@email.com"
            name="email"
            type="text"
          />
          <UserFormField
            label="Password"
            placeholder="your password (at least 6 characters)"
            name="password"
            type="password"
          />
          <UserFormField
            label="Confirm password"
            placeholder="your password (at least 6 characters)"
            name="passwordConfirm"
            type="password"
          />
          <UserFormButton text="COMPLETE SIGN UP" />
        </Form.Group>
      </Form>
    </FormProvider>
  );
}

export default UserRegForm;