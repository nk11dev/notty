import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IoPersonOutline } from 'react-icons/io5';

import ControlsButton from '@/shared/ui/controls/controls-button';

const UserControl = () => {
  const navigate = useNavigate();

  return (
    <ControlsButton
      clickHandler={() => navigate('/registration')}
      tooltip="User"
    >
      <IoPersonOutline />
    </ControlsButton>
  );
}

export default UserControl;