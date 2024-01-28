import React from 'react';
import { IoTimeOutline } from 'react-icons/io5';

import IconButton from '@/shared/ui/controls/icon-button';

const RecentControl = () => (
  <IconButton
    buttonType="control"
    tooltip="Show recent notes"
    icon={<IoTimeOutline />}
    isDisabled
  />
);

export default RecentControl;