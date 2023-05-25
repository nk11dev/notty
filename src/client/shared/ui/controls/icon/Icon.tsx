import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';

type Props = {
  icon: IconDefinition,
};

const Icon = (props: Props) => (
  <FontAwesomeIcon
    icon={props.icon}
    style={{
      width: 16,
      height: 16
    }}
  />
);

export default Icon;