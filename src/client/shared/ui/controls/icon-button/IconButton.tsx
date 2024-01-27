/* eslint-disable @typescript-eslint/no-explicit-any */
import stylesCommon from './IconButton.module.scss';
import stylesControl from './special-styles/ControlsButton.module.scss';
import stylesToolbar from './special-styles/ToolbarButton.module.scss';

import React, { cloneElement } from 'react';
import type { MouseEvent, ReactElement } from 'react';
import cn from 'classnames';

type Props = {
  buttonType: 'control' | 'toolbar',
  icon: ReactElement,
  tooltip: string,
  onClick?: (e: MouseEvent) => void;
  cls?: string,
  isActive?: boolean,
  isDisabled?: boolean,
};

const stylesMap = {
  control: stylesControl,
  toolbar: stylesToolbar,
};

const IconButton = (props: Props) => {
  const { buttonType, tooltip, onClick, cls, isActive, isDisabled } = props;

  const icon = props.icon as ReactElement;
  const stylesSpecial = stylesMap[buttonType as keyof typeof stylesMap];

  const stylesConditional = {};

  if ('isDisabled' in stylesSpecial) {
    (stylesConditional as any)[stylesSpecial.isDisabled as string] = !!isDisabled;
  }

  if ('isActive' in stylesSpecial) {
    (stylesConditional as any)[stylesSpecial.isActive as string] = !!isActive;
  }

  return (
    <span
      title={tooltip}
      onClick={onClick}
      className={cn(cls, stylesCommon.btn, stylesSpecial.btn, stylesConditional)}
    >
      {cloneElement(icon as ReactElement, {
        className: cn(icon.props.className, stylesSpecial.icon)
      })}
    </span>
  );
}

export default IconButton;