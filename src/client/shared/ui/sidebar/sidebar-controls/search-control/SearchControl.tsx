import React from 'react';
import { IoSearchOutline } from 'react-icons/io5';

import IconButton from '@/shared/ui/controls/icon-button';

const SearchControl = () => (
  <IconButton
    buttonType="control"
    tooltip="Show search"
    icon={<IoSearchOutline style={{
      padding: '6px'
    }} />}
    isDisabled
  />
);

export default SearchControl;