import styles from './UserFormField.module.scss';

import React from 'react';
import Form from 'react-bootstrap/Form';
import { useFormContext } from 'react-hook-form';

type Props = {
  type: string;
  name: string;
  label: string,
  placeholder?: string,
};

const UserFormField = (props: Props) => {
  const {
    register,
    formState: { errors }
  } = useFormContext();

  const { name } = props;
  const error = errors[name];

  return (
    <div>
      <Form.Label>
        {props.label}
      </Form.Label>

      <Form.Control
        {...register(name)}
        type={props.type}
        className={styles.control}
        placeholder={props.placeholder}
        isInvalid={!!error?.message}
      />

      <Form.Control.Feedback
        type="invalid"
        className={styles.controlFeedback}
      >
        {error?.message && (error.message as string)}
      </Form.Control.Feedback>
    </div>
  );
}

export default UserFormField;