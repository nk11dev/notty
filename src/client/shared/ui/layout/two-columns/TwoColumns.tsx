import './TwoColumns.scss';

import React from 'react';

type Props = {
  sidebarContent: React.ReactNode,
  mainContent: React.ReactNode
};

const TwoColumns = (props: Props) => (
  <div className="columns">
    <aside className="sidebar p-2">
      {props.sidebarContent}
    </aside>

    <main className="main p-2">
      {props.mainContent}
    </main>

  </div>
);

export default TwoColumns;