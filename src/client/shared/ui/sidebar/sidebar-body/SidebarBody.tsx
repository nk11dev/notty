import React from 'react';

type Props = {
  children: React.ReactNode
};

const SidebarBody = ({ children }: Props) => {
  return (
    <div className="flex-grow-1">
      {children}
    </div>
  );
}

export default SidebarBody;