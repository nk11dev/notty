import React from 'react';
import Button from 'react-bootstrap/Button';

type Props = {
  text: string,
};

const UserFormButton = (props: Props) => (
  <div className="d-grid">
    <Button variant="primary">
      {props.text}
    </Button>
  </div>
);

export default UserFormButton;