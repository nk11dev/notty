import React from 'react';
import Form from 'react-bootstrap/Form';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { userLoginPayloadSchema } from '@/common/schemas';
import type { UserLoginPayload } from '@/common/types/user.types';
import UserFormField from '@/shared/ui/forms/user-form-field';
import UserFormButton from '@/shared/ui/forms/user-form-button';

const UserLoginForm = () => {
  const methods = useForm<UserLoginPayload>({
    resolver: zodResolver(userLoginPayloadSchema),
    mode: 'onTouched',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (data: unknown) => {
    console.log('UserLoginForm.onSubmit(), data:', data);
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
            placeholder="your password"
            name="password"
          />

          <UserFormButton text="SIGN IN" />

        </Form.Group>
      </Form>
    </FormProvider>
  );
}

export default UserLoginForm;