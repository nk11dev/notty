import styles from './ControlsButton.module.scss';

import React, { cloneElement } from 'react';
import type { MouseEvent, ReactElement } from 'react';
import cn from 'classnames';

import ButtonIcon from '@/shared/ui/controls/button-icon';

type Props = {
  children?: React.ReactNode,
  clickHandler?: (e: MouseEvent) => void;
  clsIsActive?: boolean,
  tooltip?: string,
  isDisabled?: boolean,
};

const ControlsButton = (props: Props) => (
  <ButtonIcon
    clickHandler={props.clickHandler}
    cls={cn(styles.controlsBtn, {
      [styles.isActive as string]: props.clsIsActive,
      [styles.isDisabled as string]: (props.isDisabled === true)
    })}
    tooltip={props.tooltip}
  >
    {
      cloneElement(props.children as ReactElement, {
        className: styles.controlsIcon,
      })
    }
  </ButtonIcon>
);

export default ControlsButton;