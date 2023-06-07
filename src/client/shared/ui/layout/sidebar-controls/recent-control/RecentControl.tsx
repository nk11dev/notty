import React from 'react';
import { LuClock3 } from 'react-icons/lu';

import ControlsButton from '@/shared/ui/controls/controls-button';

const RecentControl = () => (
  <ControlsButton
    tooltip="Show recent notes"
    isDisabled
  >
    <LuClock3 />
  </ControlsButton>
);

export default RecentControl;