import styles from './HeaderButton.module.scss';

import React, { cloneElement } from 'react';
import type { MouseEvent, ReactElement } from 'react';
import cn from 'classnames';

import ButtonIcon from '@/shared/ui/controls/button-icon';

type Props = {
  children?: ReactElement,
  clickHandler?: (e: MouseEvent) => void;
  cls?: string,
  tooltip?: string,
  isDisabled?: boolean,
};

const HeaderButton = (props: Props) => {
  const children = props.children as ReactElement;

  return (
    <ButtonIcon
      clickHandler={props.clickHandler}
      cls={cn(styles.headerBtn, props.cls, {
        [styles.isDisabled as string]: (props.isDisabled === true)
      })}
      tooltip={props.tooltip}
    >
      {cloneElement(children, {
        className: cn(children.props.className, styles.headerIcon),
      })}
    </ButtonIcon>
  );
}

export default HeaderButton;