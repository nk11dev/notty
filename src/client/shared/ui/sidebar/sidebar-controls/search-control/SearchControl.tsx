import React from 'react';
import { IoSearchOutline } from 'react-icons/io5';

import IconButton from '@/shared/ui/controls/icon-button';

const SearchControl = () => (
  <IconButton
    buttonType="control"
    tooltip="Show search"
    icon={<IoSearchOutline />}
    isDisabled
  />
);

export default SearchControl;