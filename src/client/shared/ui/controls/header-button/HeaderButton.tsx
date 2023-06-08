import styles from './HeaderButton.module.scss';

import React, { cloneElement } from 'react';
import type { ReactElement } from 'react';
import cn from 'classnames';

import ButtonIcon from '@/shared/ui/controls/button-icon';

type Props = {
  children?: React.ReactNode,
  clickHandler?: () => void;
  tooltip?: string,
  isDisabled?: boolean,
};

const HeaderButton = (props: Props) => (
  <ButtonIcon
    clickHandler={props.clickHandler}
    cls={cn(styles.headerBtn, {
      [styles.isDisabled]: (props.isDisabled === true)
    })}
    tooltip={props.tooltip}
  >
    {
      cloneElement(props.children as ReactElement, {
        className: styles.headerIcon,
      })
    }
  </ButtonIcon>
);

export default HeaderButton;