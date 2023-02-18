import './StylesExample.scss';

import React from 'react';

type Props = {
  text: string
};

const StylesExample = (props: Props) => (
  <div className="example-text">
    {props.text}
  </div>
);

export default StylesExample;