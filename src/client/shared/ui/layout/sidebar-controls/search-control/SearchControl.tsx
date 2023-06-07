import React from 'react';
import { LuSearch } from 'react-icons/lu';

import ControlsButton from '@/shared/ui/controls/controls-button';

const SearchControl = () => (
  <ControlsButton
    tooltip="Show search"
    isDisabled
  >
    <LuSearch />
  </ControlsButton>
);

export default SearchControl;