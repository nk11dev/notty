import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlineHome } from 'react-icons/ai';

import ControlsButton from '@/shared/ui/controls/controls-button';

const HomeControl = () => {
  const navigate = useNavigate();

  return (
    <ControlsButton
      clickHandler={() => navigate('/')}
      tooltip="Home"
    >
      <AiOutlineHome />
    </ControlsButton>
  );
}

export default HomeControl;