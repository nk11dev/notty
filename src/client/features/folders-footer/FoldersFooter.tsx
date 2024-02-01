import React from 'react';
import { BsPlusLg } from 'react-icons/bs';

import { useFoldersState, useHandleCreateFolder } from '@/entities/folder/hooks';
import TextButton from '@/shared/ui/controls/text-button';
import SidebarFooter from '@/shared/ui/sidebar/sidebar-footer';

const FoldersFooter = () => {
  const { isError } = useFoldersState();
  const [onCreate] = useHandleCreateFolder();

  if (isError) {
    return null
  }

  return (
    <SidebarFooter>
      <TextButton
        text="Add folder"
        icon={<BsPlusLg size={22} />}
        onClick={onCreate}
      />
    </SidebarFooter>
  );
};

export default FoldersFooter;