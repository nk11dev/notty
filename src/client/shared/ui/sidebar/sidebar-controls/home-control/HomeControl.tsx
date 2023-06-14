import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IoHomeOutline } from 'react-icons/io5';

import ControlsButton from '@/shared/ui/controls/controls-button';

const HomeControl = () => {
  const navigate = useNavigate();

  return (
    <ControlsButton
      clickHandler={() => navigate('/')}
      tooltip="Home"
    >
      <IoHomeOutline />
    </ControlsButton>
  );
}

export default HomeControl;