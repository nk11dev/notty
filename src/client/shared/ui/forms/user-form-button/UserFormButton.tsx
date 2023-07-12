import styles from './UserFormButton.module.scss';

import React from 'react';
import Button from 'react-bootstrap/Button';
import cn from 'classnames';

type Props = {
  text: string,
  cls?: string,
};

const UserFormButton = (props: Props) => (
  <div className={cn(styles.wrapper, 'd-grid')}>
    <Button type="submit" variant="primary">
      {props.text}
    </Button>
  </div>
);

export default UserFormButton;