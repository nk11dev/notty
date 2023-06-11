import styles from './ToolbarButton.module.scss';

import React from 'react';
import cn from 'classnames';
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';

import ButtonIcon from '@/shared/ui/controls/button-icon';

type Props = {
  icon: IconDefinition,
  clickHandler?: () => void;
  tooltip?: string,
};

const ToolbarButton = (props: Props) => (
  <ButtonIcon
    icon={props.icon}
    clickHandler={props.clickHandler}
    cls={cn(styles.toolbarBtn, 'm-1')}
    size={16}
    tooltip={props.tooltip}
  />
);

export default ToolbarButton;