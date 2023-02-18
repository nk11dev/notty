import React from 'react';

const App = (props) => {

  console.log('App.jsx');

  return (
    <React.StrictMode>
      {props.children}
    </React.StrictMode>
  );
}

export default App;