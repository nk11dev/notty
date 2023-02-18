import './StylesExample.scss';

import React from 'react';

const StylesExample = (props) => {

  return (
    <div className="example-text">
      {props.text}
    </div>
  );
}

export default StylesExample;