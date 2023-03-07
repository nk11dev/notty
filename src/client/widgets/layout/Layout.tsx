import React from 'react';

import HeaderNav from '@/shared/ui/layout/HeaderNav';

type Props = {
  children: React.ReactNode
};

const Layout = (props: Props) => (
  <>
    <header className="mx-3 my-2">
      <HeaderNav />
    </header>

    <main className="mx-3 my-2">
      {props.children}
    </main>
  </>
);

export default Layout;