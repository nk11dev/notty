import React from 'react';
import { FaRegUser } from 'react-icons/fa';

import ControlsButton from '@/shared/ui/controls/controls-button';

const UserControl = () => (
  <ControlsButton
    tooltip="User"
    isDisabled
  >
    <FaRegUser />
  </ControlsButton>
);

export default UserControl;