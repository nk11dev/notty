import React from 'react';
import Form from 'react-bootstrap/Form';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { userCreatePayloadSchema } from '@/common/schemas';
import type { UserCreatePayload } from '@/common/types/user.types';
import UserFormField from '@/shared/ui/forms/user-form-field';
import UserFormButton from '@/shared/ui/forms/user-form-button';

const UserRegForm = () => {
  const methods = useForm<UserCreatePayload>({
    resolver: zodResolver(userCreatePayloadSchema),
    mode: 'onTouched',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (data: unknown) => {
    console.log('UserRegForm.onSubmit(), data:', data);
  }

  return (
    <FormProvider {...methods}>
      <Form onSubmit={methods.handleSubmit(onSubmit)}>
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