import React from 'react';
import { AiOutlineStar } from 'react-icons/ai';

import ControlsButton from '@/shared/ui/controls/controls-button';

const FavoritesControl = () => (
  <ControlsButton
    tooltip="Show favorites"
    isDisabled
  >
    <AiOutlineStar />
  </ControlsButton>
);

export default FavoritesControl;