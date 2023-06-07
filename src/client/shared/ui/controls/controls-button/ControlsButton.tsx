import styles from './ControlsButton.module.scss';

import React, { cloneElement } from 'react';
import type { ReactElement } from 'react';
import cn from 'classnames';

import ButtonIcon from '@/shared/ui/controls/button-icon';

type Props = {
  children?: React.ReactNode,
  clickHandler?: () => void;
  clsIsActive?: boolean,
  tooltip?: string,
  isDisabled?: boolean,
};

const ControlsButton = (props: Props) => (
  <ButtonIcon
    clickHandler={props.clickHandler}
    cls={cn(styles.controlsBtn, {
      [styles.isActive]: props.clsIsActive,
      [styles.isDisabled]: (props.isDisabled === true)
    })}
    tooltip={props.tooltip}
  >
    {
      cloneElement(props.children as ReactElement, {
        className: styles.controlsIcon,
        style: { padding: '7px' },
      })
    }
  </ButtonIcon>
);

export default ControlsButton;