import React from 'react';
import Form from 'react-bootstrap/Form';

type Props = {
  label: string,
  placeholder?: string,
};

const UserFormField = (props: Props) => (
  <>
    <Form.Label>
      {props.label}
    </Form.Label>

    <Form.Control
      className="mb-3"
      type="text"
      placeholder={props.placeholder}
    />
  </>
);

export default UserFormField;