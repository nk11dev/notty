import styles from './UserFormField.module.scss';

import React from 'react';
import type { ReactNode } from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { useFormContext } from 'react-hook-form';

type Props = {
  type: string;
  name: string;
  placeholder: string,
  icon: ReactNode,
};

const UserFormField = (props: Props) => {
  const {
    register,
    formState: { errors }
  } = useFormContext();

  const { name } = props;
  const error = errors[name];

  return (
    <div className={styles.field}>
      <InputGroup>
        <InputGroup.Text>
          {props.icon}
        </InputGroup.Text>
        <Form.Control
          {...register(name)}
          type={props.type}
          className={styles.control}
          placeholder={props.placeholder}
          isInvalid={!!error?.message}
          autoComplete="off"
        />
      </InputGroup>
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