import React from 'react';

type Props = {
  children: React.ReactNode
};

const App = (props: Props) => {
  console.log('App.jsx');

  return (
    <React.StrictMode>
      {props.children}
    </React.StrictMode>
  );
};

export default App;