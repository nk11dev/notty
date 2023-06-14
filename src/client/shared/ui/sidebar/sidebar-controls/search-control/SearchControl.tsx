import React from 'react';
import { IoSearchOutline } from 'react-icons/io5';

import ControlsButton from '@/shared/ui/controls/controls-button';

const SearchControl = () => (
  <ControlsButton
    tooltip="Show search"
    isDisabled
  >
    <IoSearchOutline style={{
      padding: '6px'
    }}/>
  </ControlsButton>
);

export default SearchControl;