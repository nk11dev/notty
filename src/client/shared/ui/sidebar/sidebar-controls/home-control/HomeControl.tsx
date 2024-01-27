import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IoHomeOutline } from 'react-icons/io5';

import IconButton from '@/shared/ui/controls/icon-button';

const HomeControl = () => {
  const navigate = useNavigate();

  return (
    <IconButton
      buttonType="control"
      tooltip="Home"
      icon={<IoHomeOutline />}
      onClick={() => navigate('/')}
    />
  );
}

export default HomeControl;