/* eslint-disable @typescript-eslint/no-explicit-any */
import stylesCommon from './IconButton.module.scss';
import stylesControl from './special-styles/ControlsButton.module.scss';
import stylesToolbar from './special-styles/ToolbarButton.module.scss';
import stylesEditor from './special-styles/EditorButton.module.scss';

import React, { cloneElement } from 'react';
import type { MouseEvent, ReactElement } from 'react';
import cn from 'classnames';

type Props = {
  buttonType: 'control' | 'toolbar' | 'editor',
  tooltip: string,
  icon: ReactElement,
  onClick?: (e: MouseEvent) => void,
  cls?: string,
  isDisabled?: boolean,
  isActive?: boolean,
};

const stylesMap = {
  control: stylesControl,
  toolbar: stylesToolbar,
  editor: stylesEditor,
};

const IconButton = (props: Props) => {
  const { buttonType, tooltip, onClick, cls, isActive, isDisabled } = props;
  const icon = props.icon as ReactElement;

  if (!buttonType || !tooltip || !icon) {
    return null;
  }

  const stylesSpecial = stylesMap[buttonType as keyof typeof stylesMap];

  const stylesConditional = {};

  if ('isActive' in stylesSpecial) {
    (stylesConditional as any)[stylesSpecial.isActive as string] = !!isActive;
  }

  return (
    <button
      title={tooltip}
      onClick={onClick}
      disabled={isDisabled}
      className={cn(cls, stylesCommon.btn, stylesSpecial.btn, stylesConditional)}
    >
      {cloneElement(icon as ReactElement, {
        style: {
          width: `${icon.props.size}px`,
          height: `${icon.props.size}px`,
        },
        className: cn(icon.props.className, stylesCommon.icon)
      })}
    </button>
  );
}

export default IconButton;