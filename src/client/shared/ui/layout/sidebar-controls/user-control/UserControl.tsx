import React from 'react';
import { IoPersonOutline } from 'react-icons/io5';

import ControlsButton from '@/shared/ui/controls/controls-button';

const UserControl = () => (
  <ControlsButton
    tooltip="User"
    isDisabled
  >
    <IoPersonOutline />
  </ControlsButton>
);

export default UserControl;