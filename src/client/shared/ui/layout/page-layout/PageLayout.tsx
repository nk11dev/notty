import './PageLayout.scss';

import React from 'react';

import Header from '@/shared/ui/layout/header';

type Props = {
  children: React.ReactNode
};

const PageLayout = (props: Props) => (
  <div className="wrapper">
    <Header />

    <section className="content">
      {props.children}
    </section>
  </div>
);

export default PageLayout;