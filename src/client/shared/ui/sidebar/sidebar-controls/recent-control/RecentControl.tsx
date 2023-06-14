import React from 'react';
import { IoTimeOutline } from 'react-icons/io5';

import ControlsButton from '@/shared/ui/controls/controls-button';

const RecentControl = () => (
  <ControlsButton
    tooltip="Show recent notes"
    isDisabled
  >
    <IoTimeOutline style={{
      padding: '6px'
    }} />
  </ControlsButton>
);

export default RecentControl;