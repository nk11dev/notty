import styles from './AuthButton.module.scss';

import React from 'react';
import Button from 'react-bootstrap/Button';
import cn from 'classnames';

type Props = {
  type: 'submit' | 'button',
  text: string,
  cls?: string,
  isDisabled?: boolean,
  clickHandler?: () => void;
};

const AuthButton = (props: Props) => (
  <div className={cn(styles.wrapper, 'd-grid')}>
    <Button
      type={props.type}
      variant="brand-primary"
      className={styles.button}
      disabled={!!props.isDisabled}
      onClick={() => props.clickHandler && props.clickHandler()}
    >
      {props.text}
    </Button>
  </div>
);

export default AuthButton;