import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Form from 'react-bootstrap/Form';

import { userCreatePayloadSchema } from '@/common/schemas';
import type { UserCreatePayload } from '@/common/types/user.types';

import { useRegisterUserMutation } from '@/entities/user/slices';
import type { BaseQueryError } from '@/shared/types';
import UserFormField from '@/shared/ui/forms/user-form-field';
import UserFormButton from '@/shared/ui/forms/user-form-button';

const UserRegForm = () => {
  const navigate = useNavigate();
  const [registerUser, result] = useRegisterUserMutation();

  const methods = useForm<UserCreatePayload>({
    resolver: zodResolver(userCreatePayloadSchema),
    mode: 'onTouched',
    defaultValues: {
      email: '',
      password: '',
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

  const onSubmit = (data: UserCreatePayload) => {
    registerUser(data);
  }

  return (
    <FormProvider {...methods}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3">

          <UserFormField
            label="Email"
            placeholder="your@email.com"
            name="email"
          />

          <UserFormField
            label="Password"
            placeholder="at least 6 characters"
            name="password"
          />

          <UserFormButton text="COMPLETE SIGN UP" />

        </Form.Group>
      </Form>
    </FormProvider>
  );
}

export default UserRegForm;