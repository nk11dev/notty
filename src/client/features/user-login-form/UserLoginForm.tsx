import React from 'react';
import Form from 'react-bootstrap/Form';

import UserFormField from '@/shared/ui/forms/user-form-field';
import UserFormButton from '@/shared/ui/forms/user-form-button';

const UserLoginForm = () => {
  return (
    <Form>
      <Form.Group className="mb-3">
        <UserFormField
          label="Email"
          placeholder="your@email.com"
        />

        <UserFormField
          label="Password"
          placeholder="password"
        />

        <UserFormButton
          text="SIGN IN"
        />
      </Form.Group>
    </Form>
  );
}

export default UserLoginForm;